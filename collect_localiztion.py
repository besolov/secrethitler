import os
import os.path
import re
import json

localization = {}
for dirpath, dirnames, filenames in os.walk('./imports'):
    for filename in filenames:
        fullPath = os.path.join(dirpath, filename)
        with open(fullPath) as f:
            for line in f:
                results = re.findall("\\{\\{_ *'([^\\}\\{]*)'\\}\\}", line)
                for result in results:
                    string = str(result)
                    localization[string] = string


with open('./i18n/en.i18n.json', 'w') as localizationFile:
    json.dump(localization, localizationFile, sort_keys=True)