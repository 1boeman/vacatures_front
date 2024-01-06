import helpers.scrape_util as su


def get_data(file_path):
    data = su.channel() 
    l = su.lx_etree(file_path)
    data['entries'] = items(l)
    data['title'] = l.xpath("//h2")[0].text
    return data


def items(etree):
    items = [parse(li) for li in etree.xpath("//a[contains(@class,'JobListItems__listItem')]")]
    return items


def parse(li):
    obj = su.item()
    obj['link'] = su.fix_link(li.attrib['href'],'https://waag.homerun.co/')
    obj['title'] = su.lx_text(li.xpath('.//p')[0])
    obj['description'] = su.lx_text(li)
    obj['pubDate'] = "" 
    return obj
