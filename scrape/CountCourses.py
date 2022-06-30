from os import chdir, listdir
from json import load


def countCourses():
    """
    Count all the courses that were scraped
    :return: None
    """
    chdir("courses")
    counter = 0

    for jsonFile in listdir():
        with open(jsonFile) as json_file:
            name = str(jsonFile)
            data = load(json_file)
            counter += len(data.keys())

    print("Average course per section is:", counter / len(listdir()))
    print("Total courses", counter)
