document.querySelectorAll('.view-switch').forEach(group => {
  group.addEventListener('click', event => {
    const button = event.target.closest('button');
    if (!button) return;
    const project = group.closest('.project');
    const link = project.querySelector('.project-image');
    const image = link.querySelector('img');
    const name = project.querySelector('h3').textContent;
    const { board, side } = button.dataset;
    const path = `projects/led-${board}-${side}.png`;
    image.src = path;
    image.alt = `${name} — ${side} 3D design render`;
    link.href = path;
    link.setAttribute('aria-label', `View ${name} ${side} 3D render in a new tab`);
    link.querySelector('.image-label').textContent = `3D DESIGN · ${side.toUpperCase()}`;
    group.querySelectorAll('button').forEach(item => item.setAttribute('aria-pressed', String(item === button)));
  });
});

const viewer = document.querySelector('.image-viewer');
document.querySelectorAll('.project-image, .build-photo').forEach(link => {
  link.addEventListener('click', event => {
    event.preventDefault();
    viewer.querySelector('img').src = link.href;
    viewer.querySelector('img').alt = link.querySelector('img').alt;
    viewer.querySelector('p').textContent = link.querySelector('img').alt;
    viewer.showModal();
  });
});
viewer.querySelector('button').addEventListener('click', () => viewer.close());
viewer.addEventListener('click', event => { if (event.target === viewer) viewer.close(); });
