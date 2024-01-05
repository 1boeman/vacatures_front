import helpers.scrape_util as su


def get_data(file_path):
    data = su.channel() 
    l = su.lx_etree(file_path)
    data['entries'] = items(l)
    data['title'] = l.xpath("//h2")[0].text
    return data


def items(etree):
    items = [parse(li) for li in etree.xpath("//div[contains(@class,'mx-name-vacancy_container_body')]")]
    items = [i for i in items if i]
    return items


def parse(li):
    obj = su.item()
    if not len(li.xpath('//h5')):
        return False
    obj['link'] = 'https://www.fondsen.org/p/home'
    obj['title'] = su.lx_text(li.xpath('.//div[contains(@class,"mx-name-vacancy_title")]')[0])
    obj['description'] = su.lx_text(li)
    obj['pubDate'] = ""
    return obj
