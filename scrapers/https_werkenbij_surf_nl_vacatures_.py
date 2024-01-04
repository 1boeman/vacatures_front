import helpers.scrape_util as su


def get_data(file_path):
    data = su.channel() 
    l = su.lx_etree(file_path)
    data['entries'] = items(l)
    data['title'] = l.xpath("//h2")[0].text
    return data


def items(etree):
    items = [parse(li) for li in etree.xpath("//div[contains(@class,'archive__content')]/div[contains(@class,'column')]")]
    return items


def parse(li):
    obj = su.item()
    if (len(li.xpath('.//a'))):

        obj['link'] = su.fix_link(li.xpath('.//a')[0].attrib['href'],'https://werkenbij.surf.nl')
    else:
        return False
        obj['link'] = 'https://werkenbij.surf.nl/vacatures/'
        
    obj['title'] = su.lx_text(li.xpath('.//h2[contains(@class,"post-item__title")]/a')[0])
    obj['description'] = su.lx_text_all(li.xpath(".//div[contains(@class,'post-item__content')]"))
    obj['pubDate'] = ""
    return obj
