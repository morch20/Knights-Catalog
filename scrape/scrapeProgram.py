from selenium import webdriver
from time import sleep
from json import dumps
from re import findall
from selenium.webdriver.chrome.options import Options
from threading import Thread

THREADS = []

def filterString(text: str):
    """
    Filters out the following characters: dots, parentheses, and commas. Then, replaces all spaces into dashes
    and returns all lowercase string.
    :param text: "This, is a . example (string)"
    :return: "this-is-a-example-string"
    """
    return "-".join(text.replace(".", "").replace("(", "").replace(")", "").replace(",", "").split(" ")).lower()

def createDicTag(tagsArray: list):
    """
    Creates a dictionary of html tags. Where the key is text of the tag as well as the value
    :param tagsArray: ["this is the text of a html tag", ...]
    :return: {"this is the text of a html tag": "this is the text of a html tag",...}
    """
    dic = {}
    for j in range(len(tagsArray)):
        try:
            dic[tagsArray[j].text] = tagsArray[j].text
        except:
            print(tagsArray[j].text)

    return dic

def getLinks(driver):
    """
    Gets all the links in an selected section of the WebElement and organizes the links in a dictionary
    :param driver: WebElement
    :return: dictionary or None if there wasn't any links
    """
    links = driver.find_elements_by_tag_name('a')

    if (len(links) > 0):
        dic = {}
        dic["text"] = {}
        dic["url"] = {}
        for j in range(len(links)):
            dic["text"][links[j].text] = links[j].text
            dic["url"][links[j].text] = links[j].get_attribute("href")
        return dic

    else:
        return None

def general(program, sectionTitle, sectionBody):
    """
    Scrapes everything in a general section as well as links.
    :param program: dict
    :param sectionTitle: current section title
    :param sectionBody: current section WebElement
    :return: None
    """

    program["sections"][sectionTitle]["body"]["text"] = sectionBody.text

    links = getLinks(sectionBody)
    if (links != None):
        program["sections"][sectionTitle]["body"]["links"] = links


    print(f"\n\n************ {program['sections'][sectionTitle]['title']} ************")
    return

def organizeTags(program, sectionTitle, sectionBody, header: bool):
    """
    scrapes a section where the html structure is unknown by organizing all the html tags into a dictionary and links
    :param program: dict
    :param sectionTitle: current section title
    :param sectionBody: current section WebElement
    :param header: bool that specifies if this section has header or not
    :return: None
    """

    sectionBody = sectionBody.find_element_by_class_name("style__richTextWrapper___3FIVs")
    sectionBodyArray = sectionBody.text.split("\n\n\n")

    pTagsArray = sectionBody.find_elements_by_tag_name("p")
    liTagsArray = sectionBody.find_elements_by_tag_name("li")
    h4TagsArray = sectionBody.find_elements_by_tag_name("h4")
    h3TagsArray = sectionBody.find_elements_by_tag_name("h3")
    h2TagsArray = sectionBody.find_elements_by_tag_name("h2")

    program["sections"][sectionTitle]["body"]["p"] = createDicTag(pTagsArray)
    program["sections"][sectionTitle]["body"]["li"] = createDicTag(liTagsArray)
    program["sections"][sectionTitle]["body"]["h4"] = createDicTag(h4TagsArray)
    program["sections"][sectionTitle]["body"]["h3"] = createDicTag(h3TagsArray)
    program["sections"][sectionTitle]["body"]["h2"] = createDicTag(h2TagsArray)
    program["sections"][sectionTitle]["body"]["courseSections"] = {}
    links = getLinks(sectionBody)
    if (links != None):
        program["sections"][sectionTitle]["body"]["links"] = links


    divCounter = 0
    try:
        while True:
            div = sectionBody.find_element_by_xpath(f"div[{divCounter + 1}]")
            divCounter += 1
    except Exception as e:
        print(e)
        print("divCounter", divCounter)

    if divCounter > 1:

        for j in range(divCounter):
            program["sections"][sectionTitle]["body"]["courseSections"][f"courseSection{j}"] = {}
            div = sectionBody.find_element_by_xpath(f"div[{j + 1}]").text
            if (header):
                program["sections"][sectionTitle]["body"]["courseSections"][f"courseSection{j}"]["header"] = \
                    div.split("\n")[0]

            program["sections"][sectionTitle]["body"]["courseSections"][f"courseSection{j}"]["text"] = div

    else:

        for j in range(len(sectionBodyArray)):
            program["sections"][sectionTitle]["body"]["courseSections"][f"courseSection{j}"] = {}
            if header:
                program["sections"][sectionTitle]["body"]["courseSections"][f"courseSection{j}"]["header"] = \
                sectionBodyArray[j].split("\n")[0]

            program["sections"][sectionTitle]["body"]["courseSections"][f"courseSection{j}"]["text"] = sectionBodyArray[j]

    print(f"\n\n************ {program['sections'][sectionTitle]['title']} ************")
    return

def GEP(program, sectionTitle, sectionBody):
    """
    Scrapes the GEP section of the program handling all the cases of the different html body structure
    :param program: dict
    :param sectionTitle: current section title
    :param sectionBody: current section WebElement
    :return: None
    """

    credits = sectionBody.find_element_by_class_name("style__itemHeaderH3___3XUmR")
    program["sections"][sectionTitle]["body"]["grandTotalCredits"] = credits.text
    container = sectionBody.find_element_by_class_name("rules-wrapper")
    div = container.find_element_by_tag_name("div")

    header = div.find_elements_by_tag_name("header")

    header = list(filter(lambda item: "Credits" in item.text, header))

    program["sections"][sectionTitle]["body"]["headers"] = {}
    program["sections"][sectionTitle]["body"]["courseSections"] = {}

    for j in range(len(header)):
        program["sections"][sectionTitle]["body"]["headers"][f"header{j}"] = {}
        subHeader = header[j].find_elements_by_tag_name("div")

        program["sections"][sectionTitle]["body"]["headers"][f"header{j}"]["text"] = subHeader[0].text
        span = subHeader[2].find_elements_by_tag_name("span")
        program["sections"][sectionTitle]["body"]["headers"][f"header{j}"]["credits"] = span[0].text + " " + span[1].text

    secCounter = 0
    try:
        while (True):
            sec = div.find_element_by_xpath(f"section[{secCounter + 1}]")
            secCounter += 1

    except:
        print("secCounter is", secCounter)

    if secCounter > 1:

        increment = 0
        for j in range(secCounter):
            sec = div.find_element_by_xpath(f"section[{j + 1}]")
            program["sections"][sectionTitle]["body"]["courseSections"][f"courseSection{j + increment}"] = {}

            subSecCoubter = 0
            try:
                while (True):
                    subSec = sec.find_element_by_xpath(f"div/div[2]/section[{subSecCoubter + 1}]")
                    li = subSec.find_element_by_tag_name("li")
                    ul = li.find_element_by_tag_name("ul")
                    increment += 1
                    program["sections"][sectionTitle]["body"]["courseSections"][f"courseSection{j + increment}"] = {}

                    lisCounter = 0
                    try:
                        while (True):
                            lis = ul.find_element_by_xpath(f"li[{lisCounter + 1}]")
                            program["sections"][sectionTitle]["body"]["courseSections"][f"courseSection{j + increment}"][f"text{lisCounter}"] = lis.text
                            lisCounter += 1
                    except:
                        print(" Exception! lisCounter", lisCounter)

                    subSecCoubter += 1

            except:
                print("Subsec found!", subSecCoubter)

            if subSecCoubter == 0:
                li = sec.find_element_by_tag_name("li")
                program["sections"][sectionTitle]["body"]["courseSections"][f"courseSection{j + increment}"] = {}
                try:
                    ul = li.find_element_by_tag_name("ul")
                    lisCounter = 0
                    try:
                        while (True):
                            lis = ul.find_element_by_xpath(f"li[{lisCounter + 1}]")
                            program["sections"][sectionTitle]["body"]["courseSections"][f"courseSection{j + increment}"][f"text{lisCounter}"] = lis.text
                            lisCounter += 1
                    except:

                        try:
                            tmpDiv = ul.find_elements_by_xpath("div")
                            for tmpDivIterator in range(len(tmpDiv)):
                                program["sections"][sectionTitle]["body"]["courseSections"][f"courseSection{j + increment}"][
                                    f"text{lisCounter + tmpDivIterator}"] = tmpDiv[tmpDivIterator].text

                        except Exception as e:
                            print(e)

                        print(" Exception! lisCounter", lisCounter)
                except:
                    program["sections"][sectionTitle]["body"]["courseSections"][f"courseSection{j + increment}"]["text0"] = li.text

    else:
        li = div.find_element_by_tag_name("li")
        ul = li.find_element_by_tag_name("ul")

        divCounter = 0
        try:
            while (True):
                subDiv = ul.find_element_by_xpath(f"div[{divCounter + 1}]")
                program["sections"][sectionTitle]["body"]["headers"][f"header{divCounter}"] = {}
                program["sections"][sectionTitle]["body"]["courseSections"][f"courseSection{divCounter}"] = {}
                program["sections"][sectionTitle]["body"]["headers"][f"header{divCounter}"]["text"] = subDiv.find_element_by_tag_name(
                    "span").text
                subUl = subDiv.find_element_by_tag_name("ul")

                subLiCounter = 0
                try:
                    while (True):
                        subLi = subUl.find_element_by_xpath(f"li[{subLiCounter + 1}]")
                        program["sections"][sectionTitle]["body"]["courseSections"][f"courseSection{divCounter}"][f"text{subLiCounter}"] = subLi.text
                        subLiCounter += 1
                except:
                    print("SubLi", subLiCounter)

                divCounter += 1

        except:
            print("divCounter", divCounter)

    print(f"\n\n************ {program['sections'][sectionTitle]['title']} ************")
    return

def CPP(program, sectionTitle, sectionBody):
    """
    Scrapes the CPP section of the program handling all the cases of the different html body structure
    :param program: dict
    :param sectionTitle: current section title
    :param sectionBody: current section WebElement
    :return: None
    """

    credits = sectionBody.find_element_by_class_name("style__itemHeaderH3___3XUmR")
    program["sections"][sectionTitle]["body"]["grandTotalCredits"] = credits.text
    container = sectionBody.find_element_by_class_name("rules-wrapper")
    div = container.find_element_by_tag_name("div")
    program["sections"][sectionTitle]["body"]["courseSections"] = {}
    program["sections"][sectionTitle]["body"]["courseSections"]["courseSection0"] = {}
    li = div.find_element_by_tag_name("li")

    subLiCounter = 0
    try:
        ul = li.find_element_by_tag_name("ul")
        while (True):
            subLi = ul.find_element_by_xpath(f"li[{subLiCounter + 1}]")
            program["sections"][sectionTitle]["body"]["courseSections"]["courseSection0"][f"text{subLiCounter}"] = subLi.text
            subLiCounter += 1

    except:

        try:
            ul = li.find_element_by_tag_name("ul")
            tmpDiv = ul.find_elements_by_xpath("div")
            for tmpDivIterator in range(len(tmpDiv)):
                program["sections"][sectionTitle]["body"]["courseSections"]["courseSection0"][
                    f"text{subLiCounter + tmpDivIterator}"] = tmpDiv[tmpDivIterator].text

        except Exception as e:
            print(e)

        print("subLi", subLiCounter)

    subDivCounter = 0
    try:
        ul = li.find_element_by_tag_name("ul")
        subDiv = ul.find_element_by_xpath(f"div")
        subUl = subDiv.find_element_by_tag_name("ul")

        while (True):
            subLi = subUl.find_element_by_xpath(f"li[{subDivCounter + 1}]")
            program["sections"][sectionTitle]["body"]["courseSections"]["courseSection0"][f"text{subDivCounter + subLiCounter}"] = subLi.text
            subDivCounter += 1

    except:
        print("div")

    if subLiCounter == 0:
        program["sections"][sectionTitle]["body"]["courseSections"]["courseSection0"]["text0"] = li.text

    print(f"\n\n************ {program['sections'][sectionTitle]['title']} ************")
    return

def degreeRequiremts(program, sectionTitle, sectionBody):
    """
    Scrapes the Degree Requirements section of the program handling all the cases of the different html body structure
    :param program: dict
    :param sectionTitle: current section title
    :param sectionBody: current section WebElement
    :return: None
    """

    credits = sectionBody.find_element_by_class_name("style__itemHeaderH3___3XUmR")
    program["sections"][sectionTitle]["body"]["grandTotalCredits"] = credits.text
    container = sectionBody.find_element_by_class_name("rules-wrapper")
    div = container.find_element_by_tag_name("div")

    header = div.find_elements_by_tag_name("header")
    header = list(filter(lambda item: "Credits" in item.text, header))
    program["sections"][sectionTitle]["body"]["headers"] = {}
    program["sections"][sectionTitle]["body"]["courseSections"] = {}

    for j in range(len(header)):
        program["sections"][sectionTitle]["body"]["headers"][f"header{j}"] = {}
        subHeader = header[j].find_elements_by_tag_name("div")

        program["sections"][sectionTitle]["body"]["headers"][f"header{j}"]["text"] = subHeader[0].text
        span = subHeader[2].find_elements_by_tag_name("span")
        program["sections"][sectionTitle]["body"]["headers"][f"header{j}"]["credits"] = span[0].text + " " + span[1].text

    section = div.find_elements_by_xpath("section")
    secCounter = len(section)
    print("secCounter is", secCounter)

    if secCounter >= 1:

        increment = 0
        for j in range(secCounter):
            sec = section[j]
            program["sections"][sectionTitle]["body"]["courseSections"][f"courseSection{j + increment}"] = {}

            subSection = sec.find_elements_by_xpath(f"div/div[2]/section")
            subSecCounter = len(subSection)

            for subSectionIterator in range(subSecCounter):
                subSec = subSection[subSectionIterator]
                li = subSec.find_element_by_tag_name("li")
                try:
                    ul = li.find_element_by_tag_name("ul")
                    increment += 1
                    program["sections"][sectionTitle]["body"]["courseSections"][f"courseSection{j + increment}"] = {}

                    liList = ul.find_elements_by_xpath("li")
                    lisCounter = len(liList)
                    for lisIterator in range(lisCounter):
                        lis = liList[lisIterator]
                        program["sections"][sectionTitle]["body"]["courseSections"][f"courseSection{j + increment}"][
                            f"text{lisIterator}"] = lis.text

                    print(" Exception! lisCounter", lisCounter)

                except:
                    increment += 1
                    program["sections"][sectionTitle]["body"]["courseSections"][f"courseSection{j + increment}"] = {}
                    program["sections"][sectionTitle]["body"]["courseSections"][f"courseSection{j + increment}"]["text0"] = li.text

            print("Subsec found!", subSecCounter)

            if subSecCounter == 0:
                li = sec.find_element_by_tag_name("li")
                program["sections"][sectionTitle]["body"]["courseSections"][f"courseSection{j + increment}"] = {}
                try:
                    ul = li.find_element_by_tag_name("ul")
                    lisCounter = 0
                    try:
                        while (True):
                            lis = ul.find_element_by_xpath(f"li[{lisCounter + 1}]")
                            program["sections"][sectionTitle]["body"]["courseSections"][f"courseSection{j + increment}"][
                                f"text{lisCounter}"] = lis.text
                            lisCounter += 1
                    except:
                        print(" Exception! lisCounter", lisCounter)

                    divCounter = 0
                    try:
                        while (True):
                            div = ul.find_element_by_xpath(f"div[{divCounter + 1}]")
                            subTitle = div.find_element_by_tag_name("span").text

                            try:
                                subUl = div.find_element_by_tag_name("ul")
                            except:
                                subUl = div.find_element_by_tag_name("li")

                            program["sections"][sectionTitle]["body"]["courseSections"][f"courseSection{j + increment}"][
                                f"text{divCounter + lisCounter}"] = subTitle + "\n" + subUl.text
                            divCounter += 1

                    except:
                        print(" Exception! divCounter", divCounter)

                except:
                    program["sections"][sectionTitle]["body"]["courseSections"][f"courseSection{j + increment}"][
                        "text0"] = li.text

    else:
        li = div.find_element_by_tag_name("li")
        ul = li.find_element_by_tag_name("ul")

        divCounter = 0
        try:
            while (True):
                subDiv = ul.find_element_by_xpath(f"div[{divCounter + 1}]")
                program["sections"][sectionTitle]["body"]["headers"][f"header{divCounter}"] = {}
                program["sections"][sectionTitle]["body"]["courseSections"][f"courseSection{divCounter}"] = {}
                program["sections"][sectionTitle]["body"]["headers"][f"header{divCounter}"][
                    "text"] = subDiv.find_element_by_tag_name(
                    "span").text
                program["sections"][sectionTitle]["body"]["headers"][f"header{divCounter}"]["credits"] = ""
                subUl = subDiv.find_element_by_tag_name("ul")

                subLiCounter = 0
                try:
                    while (True):
                        subLi = subUl.find_element_by_xpath(f"li[{subLiCounter + 1}]")
                        program["sections"][sectionTitle]["body"]["courseSections"][f"courseSection{divCounter}"][
                            f"text{subLiCounter}"] = subLi.text
                        subLiCounter += 1
                except:
                    print("SubLi", subLiCounter)

                divCounter += 1

        except:
            print("divCounter", divCounter)

    program["buttons"] = getButtons(program["sections"][sectionTitle]["body"]["courseSections"])

    print(f"\n\n************ {program['sections'][sectionTitle]['title']} ************")
    return

def getHeader(title: str, program):
    """
     scrape the header of a program
    :param title: title string
    :param program: dictionary
    :return: dict
    """

    url = "https://www.ucf.edu/degree/" + filterString(title)
    dic = {}
    dic["title"] = title

    options = Options()
    options.headless = True
    driver = webdriver.Chrome(options=options)
    driver.get(url)
    sleep(3)

    if driver.current_url == "https://www.ucf.edu/degree-search/":
        driver.get("https://www.google.com/")
        sleep(3)

        input = driver.find_element_by_name("q")
        input.send_keys(title + " images hd")
        input.submit()
        sleep(3)

        try:
            img = driver.find_element_by_id("dimg_1").click()
            sleep(3)
            imgElement = driver.find_element_by_class_name("n3VNCb")
            link = imgElement.get_attribute("src")

            dic["pictureLink"] = link
            dic["subtitle"] = ""
        except:
            dic["pictureLink"] = ""
            dic["subtitle"] = ""

    else:
        try:
            divPicture = driver.find_element_by_class_name("header-media-background-wrap")
            pic = divPicture.find_element_by_tag_name("picture")
            source = pic.find_element_by_tag_name("source")
            link = source.get_attribute("srcset")
            dic["pictureLink"] = link

            header = driver.find_element_by_class_name("header-degree-content-bg")
            titleElement = header.find_element_by_class_name("header-title").text
            program["programTitle"] = titleElement

            try:
                text = header.find_element_by_class_name("header-subtitle").text
                dic["subtitle"] = text
            except:
                dic["subtitle"] = ""

        except Exception as e:
            print(e)

    driver.quit()
    return dic

def getCoursesCodes():
    """
    return a dict with all the courses codes and names
    :return: dict
    """
    dic = {'ACG': 'ACG - Accounting General', 'ADE': 'ADE - Adult Education', 'ADV': 'ADV - Advertising',
 'AFA': 'AFA - African American Studies', 'AFH': 'AFH - African History', 'AFR': 'AFR - Air Force ROTC',
 'AMH': 'AMH - American History', 'AML': 'AML - American Literature', 'ANT': 'ANT - Anthropology',
 'APK': 'APK - Applied Kinesiology', 'ARA': 'ARA - Arabic', 'ARC': 'ARC - Architecture', 'ARE': 'ARE - Art Education',
 'ARH': 'ARH - Art History', 'ART': 'ART - Art', 'ASH': 'ASH - Asian History', 'ASL': 'ASL - American Sign Language',
 'AST': 'AST - Astronomy', 'ATR': 'ATR - Athletic Training', 'BCH': 'BCH - Biochemistry',
 'BME': 'BME - Biomedical Engineering', 'BOT': 'BOT - Botany', 'BSC': 'BSC - Biology',
 'BTE': 'BTE - Business Teacher Education', 'BUL': 'BUL - Business Law', 'CAP': 'CAP - Computer Applications',
 'CCE': 'CCE - Civil Construction Engineering', 'CCJ': 'CCJ - Criminal Justice',
 'CDA': 'CDA - Computer Design-Architecture', 'CEG': 'CEG - Civil Geotechnical Structures',
 'CEN': 'CEN - Computer Programming', 'CES': 'CES - Civil Engineering Structure',
 'CET': 'CET - Computer Engineering Technology', 'CGN': 'CGN - Civil Engineering', 'CGS': 'CGS - Computer General',
 'CHI': 'CHI - Chinese', 'CHM': 'CHM - Chemistry', 'CHS': 'CHS - Chemistry Specialized',
 'CIS': 'CIS - Computer and Information Systems', 'CJC': 'CJC - Criminal Justice Corrections',
 'CJE': 'CJE - Criminal Justice Law Enforcement', 'CJJ': 'CJJ - Criminal Justice Juvenile Justice',
 'CJL': 'CJL - Criminal Justice Law and Process', 'CJT': 'CJT - Criminal Justice Technology',
 'CLP': 'CLP - Clinical Psychology', 'CLT': 'CLT - Classical Culture Translation', 'CNT': 'CNT - Computer Networks',
 'COM': 'COM - Communications', 'COP': 'COP - Computer Programming', 'COT': 'COT - Computer Theory',
 'CPO': 'CPO - Comparative Politics', 'CRW': 'CRW - Creative Writing', 'CWR': 'CWR - Civil Water Resources',
 'DAA': 'DAA - Dance Activities', 'DAE': 'DAE - Dance Education', 'DAN': 'DAN - Dance History',
 'DEP': 'DEP - Developmental Psychology', 'DIG': 'DIG - Digital Media', 'DSC': 'DSC - Domestic Security',
 'EAB': 'EAB - Experimental Analysis of Behavior', 'EAP': 'EAP - English as a Second Language for Academic Purposes',
 'EAS': 'EAS - Engineering- Aerospace', 'ECM': 'ECM - Engineering- Computer Mathematics', 'ECO': 'ECO - Economics',
 'ECP': 'ECP - Economic Problems & Policy', 'ECS': 'ECS - Economic Systems & Development',
 'ECT': 'ECT - Education-Career-Technical', 'ECW': 'ECW - Education-Career-Workforce',
 'EDE': 'EDE - Education- Elementary', 'EDF': 'EDF - Education- Foundations', 'EDG': 'EDG - Education- General',
 'EDP': 'EDP - Education- Psychology', 'EEC': 'EEC - Education- Early Childhood',
 'EEE': 'EEE - Eng- Electrical & Electronic', 'EEL': 'EEL - Engineering- Electrical',
 'EES': 'EES - Environmental Engineering Science', 'EEX': 'EEX - Education- Exceptional-Care Competencies',
 'EGM': 'EGM - Engineering Science', 'EGN': 'EGN - Engineering- General', 'EGS': 'EGS - Engineering- Support',
 'EIN': 'EIN - Engineering- Industrial', 'EMA': 'EMA - Engineering- Materials',
 'EME': 'EME - Education- Technology Media', 'EML': 'EML - Engineering- Mechanical', 'ENC': 'ENC - English',
 'ENG': 'ENG - English- General', 'ENL': 'ENL - English Literature', 'ENT': 'ENT - Entrepreneurship',
 'ENV': 'ENV - Engineering- Environmental', 'ENY': 'ENY - Entomology', 'ESE': 'ESE - Education- Secondary',
 'ESI': 'ESI - Engineering System-Industrial', 'ETI': 'ETI - Engineering Technology- Industrial',
 'EUH': 'EUH - European History', 'EVR': 'EVR - Environmental Sciences', 'EXP': 'EXP - Experimental Psychology',
 'FIL': 'FIL - Film', 'FIN': 'FIN - Finance', 'FLE': 'FLE - Foreign Language Education',
 'FOL': 'FOL - Foreign and Biblical Languages', 'FRE': 'FRE - French Language',
 'FRT': 'FRT - French Culture in Translation', 'FRW': 'FRW - French Literature (Writings)',
 'FSS': 'FSS - Food Service Systems', 'GEA': 'GEA - Geography- Regional Areas', 'GEB': 'GEB - General Business',
 'GEO': 'GEO - Geography', 'GER': 'GER - German Language', 'GEW': 'GEW - German Literature (Writings)',
 'GEY': 'GEY - Gerontology', 'GIS': 'GIS - Geography- Information Science', 'GLY': 'GLY - Geology',
 'GRA': 'GRA - Graphic Design', 'HAI': 'HAI - Haitian Language', 'HAT': 'HAT - Haitian Culture in Translation',
 'HBR': 'HBR - Modern Hebrew Language', 'HCW': 'HCW - Haitian Creole Literature', 'HFT': 'HFT - Hotel and Restaurant',
 'HIM': 'HIM - Health Information Management', 'HIS': 'HIS - General History and Histriography',
 'HLP': 'HLP - Health Education', 'HSA': 'HSA - Health Services Administration', 'HSC': 'HSC - Health Science',
 'HUM': 'HUM - Humanities', 'HUN': 'HUN - Human Nutrition', 'IDH': 'IDH - Interdisciplinary Honors',
 'IDS': 'IDS - Interdisciplinary Studies', 'IHS': 'IHS - Interdisciplinary Health Professions',
 'INP': 'INP - Industrial & Applied Psychology', 'INR': 'INR - International Relations',
 'ISC': 'ISC - Interdisciplinary Sciences', 'ITA': 'ITA - Italian Language', 'ITT': 'ITT - Italian Literature',
 'ITW': 'ITW - Italian Literature (Writings)', 'JOU': 'JOU - Journalism', 'JPN': 'JPN - Japanese Language',
 'JST': 'JST - Judaic Studies', 'KOR': 'KOR - Korean Language', 'LAE': 'LAE - Language Arts & English Education',
 'LAH': 'LAH - Latin American History', 'LAS': 'LAS - Latin American Studies', 'LDR': 'LDR - Leadership Studies',
 'LEI': 'LEI - Leisure', 'LIN': 'LIN - Linguistics', 'LIT': 'LIT - Literature', 'MAA': 'MAA - Mathematics Analysis',
 'MAC': 'MAC - Mathematics Calculus and Precalculus', 'MAD': 'MAD - Mathematics Discrete',
 'MAE': 'MAE - Mathematics Education', 'MAN': 'MAN - Management', 'MAP': 'MAP - Mathematics Applied',
 'MAR': 'MAR - Marketing', 'MAS': 'MAS - Mathematics Algebraic Structures', 'MAT': 'MAT - Mathematics',
 'MCB': 'MCB - Microbiology', 'MET': 'MET - Meteorology', 'MGF': 'MGF - Mathematics General and Finite',
 'MHF': 'MHF - Mathematics History and Foundations', 'MHS': 'MHS - Mental Health Services',
 'MLS': 'MLS - Medical Laboratory Science', 'MMC': 'MMC - Mass Media Commomunications',
 'MSL': 'MSL - Military Science Leadership', 'MTG': 'MTG - Mathematics Topology and Geometry',
 'MUC': 'MUC - Music- Composition', 'MUE': 'MUE - Music Education', 'MUG': 'MUG - Music Conducting',
 'MUH': 'MUH - Music- History-Musicology', 'MUL': 'MUL - Music- Music Literature',
 'MUN': 'MUN - Music- Music Ensembles', 'MUO': 'MUO - Music Opera', 'MUS': 'MUS - Music', 'MUT': 'MUT - Music- Theory',
 'MVB': 'MVB - Music- Applied-Brasses', 'MVJ': 'MVJ - Applied Music Jazz', 'MVK': 'MVK - Music- Applied-Keyboard',
 'MVP': 'MVP - Music- Applied-Percussion', 'MVS': 'MVS - Music- Applied-Strings', 'MVV': 'MVV - Music- Applied-Voice',
 'MVW': 'MVW - Music- Applied-Woodwinds', 'NSP': 'NSP - Nursing- Special', 'NUR': 'NUR - Nursing',
 'OCE': 'OCE - Oceanography', 'OSE': 'OSE - Optical Sciences', 'PAD': 'PAD - Public Administration',
 'PAF': 'PAF - Public Affairs', 'PAZ': 'PAZ - Parks and Zoos', 'PCB': 'PCB - Process Cell Biology',
 'PCO': 'PCO - Psychology for Counseling', 'PEL': 'PEL - Physical Education Acts (Gen)-Object Centered Land',
 'PEM': 'PEM - Physcial Education Acts (Gen)-Perform Centrd Land',
 'PEO': 'PEO - Physical Education Acts (Profnl)-Object Cent Land', 'PET': 'PET - Physical Education Theory',
 'PGY': 'PGY - Photography', 'PHH': 'PHH - Philosophy, History of', 'PHI': 'PHI - Philosophy',
 'PHM': 'PHM - Philosophy of Man and Society', 'PHP': 'PHP - Philosophy, Specialized', 'PHT': 'PHT - Physical Therapy',
 'PHY': 'PHY - Physics', 'PHZ': 'PHZ - Physics Continued',
 'PLA': 'PLA - Paralegal-Legal Asstistant-Legal Administration', 'POR': 'POR - Portuguese Language',
 'POS': 'POS - Political Science', 'POT': 'POT - Political Theory', 'PPE': 'PPE - Psychology of Personality',
 'PSB': 'PSB - Psychobiology', 'PSC': 'PSC - Physical Sciences', 'PSY': 'PSY - Psychology',
 'PUP': 'PUP - Public Policy', 'PUR': 'PUR - Public Relations', 'QMB': 'QMB - Quantitative Methods in Business',
 'REA': 'REA - Reading', 'RED': 'RED - Reading Education', 'REE': 'REE - Real Estate', 'REL': 'REL - Religion',
 'RTV': 'RTV - Radio Television', 'RUS': 'RUS - Russian Language', 'RUT': 'RUT - Russian Culture in Translation',
 'SCC': 'SCC - Security', 'SCE': 'SCE - Science Education', 'SLS': 'SLS - Student Life Skills',
 'SOP': 'SOP - Social Psychology', 'SOW': 'SOW - Social Work', 'SPA': 'SPA - Speech Pathology and Audiology',
 'SPB': 'SPB - Sports Business', 'SPC': 'SPC - Speech Communication', 'SPM': 'SPM - Sports Management',
 'SPN': 'SPN - Spanish Language', 'SPT': 'SPT - Spanish Translation', 'SPW': 'SPW - Spanish Literature (Writings)',
 'SSE': 'SSE - Social Studies Education', 'STA': 'STA - Statistics', 'SYA': 'SYA - Sociology Analysis',
 'SYD': 'SYD - Sociology of Demography', 'SYG': 'SYG - Sociology, General',
 'SYO': 'SYO - Sociology--Social Organizations', 'SYP': 'SYP - Sociology-Social Processes', 'TAX': 'TAX - Taxation',
 'THE': 'THE - Theatre', 'TPA': 'TPA - Theatre Production and Administration',
 'TPP': 'TPP - Theatre Performance and Performance Training', 'TSL': 'TSL - Teaching Second Language',
 'TTE': 'TTE - Transportation and Traffic Engineering', 'VIC': 'VIC - Visual Communication',
 'WOH': 'WOH - World History', 'WST': "WST - Women's Studies", 'ZOO': 'ZOO - Zoology'}
    return dic

def getButtons(courseSections):
    """
    Find all the courseSections in the a section and make a dict with all the courses codes and names
    :param courseSections:
    :return: list of all the courses codes
    """
    codes: set = set()
    lst = []
    for key in courseSections:
        for text in courseSections[key]:

            found = findall(r"[A-Z]{3}[0-9]{4}", courseSections[key][text])
            found2 = findall(r"[A-Z]{3}\s[0-9]{4}", courseSections[key][text])

            for i in found:
                codes.add(i[0:3])
            for i in found2:
                codes.add(i[0:3])
    dic = getCoursesCodes()
    for i in codes:
        lst.append(dic[i])
    return lst

def scrapeProgram(url: str, program: dict):
    '''
    Scrapes a whole program and organizes it into parameter program that can be then converted into a JSON file
    :param url: link to the program to be scraped
    :param program: dictionary that will contain a program
    :return: None
    '''
    options = Options()
    options.headless = True
    driver = webdriver.Chrome(options=options)

    driver.get(url)
    sleep(3)
    title = driver.find_element_by_class_name("program-view__title___3jxuU").text

    program["header"] = getHeader(title, program)

    if not("programTitle" in program):
        program['programTitle'] = title
    sections = driver.find_elements_by_class_name("noBreak")

    program["sections"] = {}

    for i in range(len(sections)):
        sectionTitle = sections[i].find_element_by_class_name("program-view__label___3Ui-H").text
        program["sections"][sectionTitle] = {}
        program["sections"][sectionTitle]["title"] = sectionTitle
        program["sections"][sectionTitle]["body"] = {}
        sectionBody = sections[i].find_element_by_class_name("program-view__pre___1zoJ6")

        if (program["sections"][sectionTitle]["title"] == "College" or program["sections"][sectionTitle]["title"] == "Department" or
                program["sections"][sectionTitle]["title"] == "Program Type" or program["sections"][sectionTitle][
                    "title"] == "Is this program available 100% online?" or program["sections"][sectionTitle][
                    "title"] == "UCF Online"):

                t = Thread(target=general, args=(program, sectionTitle, sectionBody,))
                THREADS.append(t)
                t.start()

        elif program["sections"][sectionTitle]["title"] == "Program Contact Information":

            t = Thread(target=organizeTags, args=(program, sectionTitle, sectionBody, False,))
            THREADS.append(t)
            t.start()

        elif program["sections"][sectionTitle]["title"] == "Admission Requirements":

            t = Thread(target=organizeTags, args=(program, sectionTitle, sectionBody, False,))
            THREADS.append(t)
            t.start()

        elif program["sections"][sectionTitle]["title"] == "Program Description" or program["sections"][sectionTitle][
            "title"] == "Licensure Disclosure":

            t = Thread(target=organizeTags, args=(program, sectionTitle, sectionBody, False,))
            THREADS.append(t)
            t.start()

        elif program["sections"][sectionTitle]["title"] == "General Education (GEP)":

            t = Thread(target=GEP, args=(program, sectionTitle, sectionBody,))
            THREADS.append(t)
            t.start()

        elif program["sections"][sectionTitle]["title"] == "Common Program Prerequisites (CPP) (If applicable)":

            t = Thread(target=CPP, args=(program, sectionTitle, sectionBody,))
            THREADS.append(t)
            t.start()

        elif program["sections"][sectionTitle]["title"] == "Degree Requirements":

            t = Thread(target=degreeRequiremts, args=(program, sectionTitle, sectionBody,))
            THREADS.append(t)
            t.start()

        elif program["sections"][sectionTitle]["title"] == "Program Details":

            t = Thread(target=organizeTags, args=(program, sectionTitle, sectionBody, True,))
            THREADS.append(t)
            t.start()

        else:

            t = Thread(target=general, args=(program, sectionTitle, sectionBody,))
            THREADS.append(t)
            t.start()

    for t in THREADS:
        t.join()

    driver.quit()


def test():
    '''
    This is a test function to check if scrapeProgram runs correctly
    Then makes a JSON file of the program that was scraped
    :return: None
    '''
    program = {}
    urlCatalog = "https://www.ucf.edu/catalog/undergraduate/#/programs/SkbvEJ-_iO/none?bc=true&bcCurrent=Computer%20Science%20(B.S.)&bcGroup=College%20of%20Engineering%20and%20Computer%20Science&bcItemType=programs"
    scrapeProgram(urlCatalog, program)

    js = dumps(program)
    with open(f"{program['programTitle']}.json", "w") as outfile:
        outfile.write(js)
