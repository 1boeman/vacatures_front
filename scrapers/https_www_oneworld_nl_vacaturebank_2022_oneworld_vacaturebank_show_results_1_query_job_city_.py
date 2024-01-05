import helpers.scrape_util as su


def get_data(file_path):
    data = su.channel() 
    l = su.lx_etree(file_path)
    data['entries'] = items(l)
    data['title'] = l.xpath("//h1")[0].text
    return data


def items(etree):
    items = [parse(li) for li in etree.xpath("//div[contains(@class,'wpjb-job-list')]/div[contains(@class,'wpjb-grid-row')]")]
    items = [i for i in items if i]
    return items


def parse(li):
    obj = su.item()
    obj['link'] = su.fix_link(li.xpath('.//a')[1].attrib['href'],'https://www.oneworld.nl')
    obj['title'] = su.lx_text(li.xpath('.//a[contains(@class,"wpjb-job_title")]')[0])
    obj['description'] = su.lx_text(li)
    obj['pubDate'] = su.lx_text(li.xpath('.//span[contains(@class,"wpjb-job_created_at")]')[0])
    return obj
