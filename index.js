// Custom pathname for the upstream website.
const channel_name = 'idealcloverchannel'
const host_name = 'tg.idealclover.workers.dev'
const icon_url = 'https://image.idealclover.cn/blog/assets/icon.png'

const upstream_me = 't.me'
const upstream_org = 'telegram.org'
const upstream_path = '/s/' + channel_name
// const cdn_name = 'cdn5.telesco.pe'
const https = true

addEventListener('fetch', event => {
  event.respondWith(fetchAndApply(event.request))
})

async function replace_response_text(response) {
  let text = await response.text()
  // replace View Img
  let re2 = new RegExp('/img/tgme/eye(_2x)?.png', 'g')
  text = text.replace(re2, '/static/img/tgme/eye_2x.png')
  // replace channel link
  let re1 = new RegExp('telegram.org/dl', 'g')
  text = text.replace(re1, 't.me/' + channel_name)
  // replace static file
  let i = upstream_org.replace('.', '.')
  let j = host_name + '/static'
  let re = new RegExp(i, 'g')
  text = text.replace(re, j)
  // replace CDN
  // let k = cdn_name.replace('.', '\.');
  // let l = host_name + '/cdn';
  // let re4 = new RegExp(k, 'g')
  // text = text.replace(re4, l);
  // replace icon
  text=text.replace(/<i class="(tgme_page_photo_image|tgme_widget_message_user_photo) bgcolor4" data-content="(.*?)"><img src=".*?"/g,function(r,r2,r3){return '<i class="'+r2+' bgcolor4" data-content="'+r3+'"><img src="'+icon_url+'"';})
  return text
}

async function fetchAndApply(request) {
  let response = null
  let url = new URL(request.url)
  let url_hostname = url.hostname

  if (https == true) {
    url.protocol = 'https:'
  } else {
    url.protocol = 'http:'
  }

  var upstream_domain = upstream_me

  let pathname = url.pathname
  console.log(pathname)
  if (pathname.startsWith('/static')) {
    upstream_domain = upstream_org
    url.pathname = pathname.replace('/static', '')
    // } else if(pathname.startsWith('/cdn')) {
    //   upstream_domain = cdn_name;
    //   url.pathname = pathname.replace('/cdn', '');
  } else if (pathname == '/') {
    url.pathname = upstream_path
  } else {
    url.pathname = upstream_path + url.pathname
  }

  url.host = upstream_domain

  let method = request.method
  let request_headers = request.headers
  let new_request_headers = new Headers(request_headers)

  new_request_headers.set('Host', url.hostname)
  new_request_headers.set('Referer', url.hostname)
  let original_response = await fetch(url.href, {
    method: method,
    headers: new_request_headers,
  })

  let original_response_clone = original_response.clone()
  const content_type = original_response.headers.get('content-type')
  if (content_type.includes('text/') || content_type.includes('json')) {
    let modified = await replace_response_text(original_response_clone)
    // console.log(modified);
    return new Response(modified, {
      status: original_response.status,
      headers: original_response.headers,
    })
  } else {
    return original_response
  }
}