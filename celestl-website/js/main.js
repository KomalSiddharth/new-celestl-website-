// Celestl: scroll reveal and contact form.
(function () {
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Demo video: reads the link from data-video-url in index.html and plays it on click.
  // Works with Google Drive, YouTube, Vimeo and direct .mp4 links.
  function toEmbed(url) {
    var m;
    if ((m = url.match(/drive\.google\.com\/file\/d\/([\w-]+)/)) || (m = url.match(/drive\.google\.com\/open\?id=([\w-]+)/))) return { type: 'iframe', src: 'https://drive.google.com/file/d/' + m[1] + '/preview' };
    if ((m = url.match(/youtu\.be\/([\w-]+)/)) || (m = url.match(/youtube\.com\/(?:watch\?v=|embed\/|shorts\/)([\w-]+)/))) return { type: 'iframe', src: 'https://www.youtube.com/embed/' + m[1] + '?autoplay=1&rel=0' };
    if ((m = url.match(/vimeo\.com\/(\d+)/))) return { type: 'iframe', src: 'https://player.vimeo.com/video/' + m[1] + '?autoplay=1' };
    if (/^https?:\/\/.+\.(mp4|webm)(\?.*)?$/i.test(url) || /^assets\/.+\.(mp4|webm)$/i.test(url)) return { type: 'video', src: url };
    return null;
  }
  var box = document.getElementById('demo-video');
  if (box) {
    var embed = toEmbed((box.getAttribute('data-video-url') || '').trim());
    if (embed) {
      document.getElementById('video').hidden = false;
      document.getElementById('demo-video-play').addEventListener('click', function () {
        var el;
        if (embed.type === 'video') {
          el = document.createElement('video'); el.controls = true; el.autoplay = true; el.playsInline = true;
        } else {
          el = document.createElement('iframe'); el.allow = 'autoplay; fullscreen; picture-in-picture'; el.allowFullscreen = true; el.title = 'Celestl demo video';
        }
        el.src = embed.src;
        el.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;border:0;background:#000';
        box.innerHTML = ''; box.appendChild(el);
      });
    }
  }

  // Scroll reveal: section blocks fade up as they enter the screen.
  if (!reduce && 'IntersectionObserver' in window) {
    var items = document.querySelectorAll('section:not(#top) > div > *, main > section, main > div, article > div > *');
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.05 });
    items.forEach(function (el) {
      if (el.getBoundingClientRect().top > window.innerHeight * 0.9) { el.classList.add('reveal'); io.observe(el); }
    });
  }

  // Contact form: opens the visitor's email app with the details filled in.
  // TODO: replace with your form backend (Formspree, Resend, your own API) for a smoother experience.
  var form = document.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', function (ev) {
      ev.preventDefault();
      var name = form.elements.name.value.trim();
      var email = form.elements.email.value.trim();
      var project = form.elements.project.value.trim();
      var subject = encodeURIComponent('New project enquiry from ' + name);
      var body = encodeURIComponent('Name: ' + name + '\nEmail: ' + email + '\n\n' + project);
      window.location.href = 'mailto:komal@celestl.in?subject=' + subject + '&body=' + body;
    });
  }
})();
