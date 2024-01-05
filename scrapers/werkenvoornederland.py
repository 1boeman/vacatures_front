import helpers.scrape_util as su


def get_data(file_path):
    data = su.channel() 
    l = su.lx_etree(file_path)
    data['entries'] = items(l)
    data['title'] = l.xpath("//h1")[0].text
    return data


def items(etree):
    items = [parse(li) for li in etree.xpath("//div[contains(@class,'vacancy-list__item')]")]
    items = [i for i in items if i]
    return items


def parse(li):
    obj = su.item()
    if not len(li.xpath('.//a')):
        return False
    obj['link'] = su.fix_link(li.xpath('.//a')[0].attrib['href'],'https://www.werkenvoornederland.nl/vacatures')
    obj['title'] = su.lx_text(li.xpath('.//h2[contains(@class,"vacancy__title")]/a')[0])
    obj['description'] = su.lx_text(li.xpath(".//section[@class='vacancy']")[0])
    obj['pubDate'] = ""
    return obj
