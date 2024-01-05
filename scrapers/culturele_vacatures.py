import helpers.scrape_util as su


def get_data(file_path):
    data = su.channel() 
    l = su.lx_etree(file_path)
    data['entries'] = items(l)
    data['title'] = l.xpath("//h1")[0].text
    return data


def items(etree):
    items = [parse(li) for li in etree.xpath("//article")]
    print (len(items))
    return items


def parse(li):
    obj = su.item()
    obj['link'] = su.fix_link(li.xpath('.//a')[0].attrib['href'],'https://www.culturele-vacatures.nl')
    obj['title'] = su.lx_text(li.xpath('.//h1')[0])
    obj['description'] = su.lx_text(li)
    obj['pubDate'] = su.lx_text(li.xpath('.//time')[0])
    return obj
