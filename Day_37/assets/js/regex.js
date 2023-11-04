const number = /((0|\+84)[0-9]{9,12})/g;
const email = /([a-zA-Z][\w\-_.%+=]*@[a-zA-Z-_.]+\.[a-zA-Z]{2,3})/gi;
const link =
  /((((https|http):\/\/([a-z0-9][a-z0-9-_\.]*\.|))|([a-z0-9][a-z0-9-_\.]*\.))[a-z0-9][a-z0-9-_\.]*\.[a-z]{2,}(:\d{2,}|)((\/[^\s]+)|\/*))/gi;
const youtube =
  /((?:((https|http):\/\/)|)(?:[a-z0-9][a-z0-9\.]*\.|)youtube\.com\/([^\s]+))/;

export function regexLink(content) {
  content = content
    .replace(number, `<a href="tel:$1" target="_blank">$1</a>`)
    .replace(email, `<a href="mailto:$1" target="_blank">$1</a>`)
    .replace(link, function (link) {
      if (!link.includes("http")) {
        link = `https://` + link;
      }

      if (link.includes("youtube")) {
        const id = link.match(youtube);
        // const index = id[4].indexOf("=");
        const video = id[4].slice(id[4].indexOf("=") + 1);
        return `
        <iframe
          width='560'
          height='315'
          src='https://www.youtube.com/embed/${video}'
          title='YouTube video player'
          frameBorder='0'
          allow='accelerometer; autoplay; clipboard-write;
          encrypted-media; gyroscope; picture-in-picture; web-share'
          allowFullScreen></iframe>
        `;
      } else {
        return `<a href="${link}" target="_blank">${link}</a>`;
      }
    });
  return content;
}
