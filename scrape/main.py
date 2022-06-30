from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from time import sleep
from json import dumps
from threading import Thread
from scrapeProgram import scrapeProgram

urlAllCoursesU = "https://www.ucf.edu/catalog/undergraduate/#/courses"
urlAllCoursesG = "https://www.ucf.edu/catalog/graduate/#/courses"
urlAllProgramsU = "https://www.ucf.edu/catalog/undergraduate/#/programs"
urlAllProgramsG = "https://www.ucf.edu/catalog/graduate/#/programs"

search = {}
search["courses"] = []
search["programs"] = []

COURSES = {}
THREADS = []

def validateWord(word):
    """
    Makes sure 'word' does not have any invalid characters and replace them with '-'
    :param word: str
    :return: str
    """
    invalidCharacters = ["\\", "/", ":", "*", "?", "\"", "<", ">", "|"]
    for c in invalidCharacters:
        word = word.replace(c, "-")

    return word


def helper(aURL):
    """
    This helper function makes sure to call scrapeCourse() until the function terminates successfully
    :param aURL: link to the course
    :return: None
    """
    while (True):

        try:
            options2 = Options()
            options2.headless = True
            driver2 = webdriver.Chrome(options=options2)
            try:
                scrapeCourse(aURL, driver2)
                break
            except Exception as e:
                driver2.quit()
                print("Inside scrapeCourses()")
                print(e)
                sleep(2)

        except Exception as e:
            print("Inside Helper()")
            print(e)
            sleep(3)
    return


def scrapeCourse(url, driver):
    """
    Scrapes all the content in a course and stores it into COURSES
    :param url: link of the course
    :param driver: WebElement
    :return: None
    """
    driver.get(url)
    sleep(3)

    dic = {}
    container = driver.find_element_by_id("__KUALI_TLP")
    name = container.find_element_by_tag_name("h2").text
    sections = container.find_elements_by_class_name("noBreak")

    dic["name"] = name
    for section in sections:
        h3 = section.find_element_by_tag_name("h3").text
        div = section.find_element_by_class_name("course-view__pre___2VF54").text
        dic[h3] = {}
        dic[h3]["title"] = h3
        dic[h3]["text"] = div

    driver.quit()
    COURSES[name] = dic
    print("SUCCESS!!!!", name)


def getContent(style: str, driver, url: str, content: str):
    """
    Scrapes all the content of the given url whether is a course or program and organizes them into JSON files
    :param style: css class of the content
    :param driver: WebElement
    :param url: link to the content
    :param content: type of the content
    :return: None
    """
    driver.get(url)
    sleep(3)

    sections = driver.find_elements_by_class_name(style)

    for section in sections:

        while (True):
            options = Options()
            options.headless = True
            newDriver = webdriver.Chrome(options=options)

            try:

                newDriver.get(section.get_attribute("href"))
                sleep(3)

                container = newDriver.find_element_by_class_name("style__collapsibleBox___15waq")
                codeTitle = container.find_element_by_tag_name("h2").text
                codeTitle = validateWord(codeTitle)

                aTags = container.find_elements_by_tag_name("a")

                if content == "courses":
                    for a in aTags:
                        aURL = a.get_attribute("href")

                        if len(aTags) <= 20:
                            t = Thread(target=helper, args=(aURL,))
                            t.start()
                            THREADS.append(t)
                        else:
                            helper(aURL)

                    for i in THREADS:
                        i.join()
                    THREADS.clear()

                    newDriver.quit()
                    js = dumps(COURSES)
                    with open(f"courses/{codeTitle}.json", "w") as outfile:
                        outfile.write(js)
                    COURSES.clear()

                else:

                    for a in aTags:
                        aURL = a.get_attribute("href")

                        program = {}
                        try:
                            scrapeProgram(aURL, program)
                        except Exception as e:
                            print("ScrapeProgram() Error!!!")
                            print(e)
                            break

                        name = validateWord(program['programTitle'])
                        js = dumps(program)
                        with open(f"programs/{codeTitle}/{name}.json", "w") as outfile:
                            outfile.write(js)

                        programSearch = {}
                        programSearch["header"] = program["header"]
                        programSearch["type"] = program["sections"]["Program Type"]["body"]["text"]
                        programSearch["college"] = codeTitle
                        try:
                            programSearch["department"] = program["sections"]["Department"]["body"]["text"]
                        except Exception as e:
                            print(e)

                        js = dumps(programSearch)
                        with open(f"searchAll/{name}.json", "w") as outfile:
                            outfile.write(js)

                        print("SUCESS!!!", a.text)

                break
            except Exception as e:
                newDriver.quit()
                print(e)


def writeFiles():
    """
    write all the JSON files of all the courses and programs
    :return: None
    """
    options = Options()
    options.headless = True

    driver = webdriver.Chrome(options=options)

    getContent("style__linkButton___2NRHE", driver, urlAllCoursesU, "courses")

    getContent("style__linkButton___2NRHE", driver, urlAllProgramsU, "programs")


    driver.quit()


writeFiles()
