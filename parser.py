import json
from collections import OrderedDict

#abrir json como lista de dicionarios

with open("./cinemaATP.json", encoding="utf-8") as f:
  movies = json.load(f)


#ordenar alfabeticamente a lista
sorted1 = list( sorted(movies, key=lambda x: x["title"].lower()) )

#abrir index.html
#index = open("index.html", "w",encoding="utf-8")

#começar o parsing para os ficheiros de cada filme
ficheiro = 1

for item in sorted1:
    f = open("./html/f" + str(ficheiro) + ".html", "w",encoding="utf-8")
    f.write('<!DOCTYPE html>\n')
    f.write('<html lang="eng">\n')
    f.write('<head>\n')
    f.write('\t<meta charset="UTF-8">\n')
    f.write('\t<meta name="viewport" content="width=device-width, initial-scale=1.0">\n')
    f.write('\t<link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">\n')
    f.write(f'\t<title>{item["title"]}</title>\n')
    f.write('</head>\n<body style="background:rgb(70, 148, 177)">\n')
    f.write(f'\t<div class="w3-bar w3-center"><h1 class="w3-opacity"><b>{item["title"]}</b></h1></div>\n')
    f.write(f'\t<div class="w3-container w3-margin-left"><h3>Release Date: {item["year"]}</h3>\n')
    f.write('\t\t<h4>Cast:</h4>\n')
    f.write('\t\t<ul>\n')
    for actor in item["cast"]:
        f.write(f'\t\t\t<li>{actor}</li>\n')
    f.write('\t\t</ul>\n')
    f.write('\t\t<h3>Genres:</h3>\n')
    f.write('\t\t<ul>\n')
    for genre in item["genres"]:
        f.write(f'\t\t\t<li>{genre}</li>\n')
    f.write('\t\t</ul>\n')
    f.write('\t</div>\n')
    f.write('\t<div class="w3-container w3-center"><a href="http://localhost:7777/filmes">Go Back</a></div>\n')
    f.write('</body>\n')
    f.write('</html>\n')

    ficheiro+=1

#index.html
t = open("./html/index.html", "w",encoding="utf-8")
i = 1

t.write(f'''<!DOCTYPE html>\n
<head>
    <meta charset="UTF-8">
    <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
    <title> Filmes </title>
</head>
<body>
<div class="w3-container w3-margin-left">''')
ficheiro = 1
for title in sorted1:
    t.write(f'''<p><a href="http://localhost:7777/filmes/f{ficheiro}"> {title['title']} </a></p>''')
    i += 1

t.write('''</div>
</body>
</html>''')
