// Resume button (only in About section) opens resume (change path if needed)
function openResume()
{
  window.open('resume.jpg','_blank');
}
document.getElementById('resumeBtn2').addEventListener('click', openResume);

// Animate simple progress bars by reading data-value (trigger on reveal)
function animateBars(root) 
{
  (root || document).querySelectorAll('.bar').forEach(function(bar)
  {
    var val = parseInt(bar.getAttribute('data-value')||0,10);
    bar.style.width = val + '%';
  });
}

// Intersection Observer to reveal elements and animate
var io = new IntersectionObserver(function(entries)
{
  entries.forEach(function(e)
  {
    if(e.isIntersecting)
    {
      e.target.classList.add('visible');
      // animate bars when skills section visible
      if(e.target.closest('#skills') || e.target.id === 'skills')
      {
        animateBars(document);
      } 
      else 
      {
        // if box contains .bar, animate those specifically
        if(e.target.querySelectorAll) 
        {
          animateBars(e.target);
        }
      }
      io.unobserve(e.target);
    }
  });
}, {threshold: 0.12});

document.querySelectorAll('.reveal').forEach(function(el){ io.observe(el); });
document.querySelectorAll('.box.reveal').forEach(function(el){ io.observe(el); });

// Project image click to open modal
document.querySelectorAll('.img-overlay img').forEach(function(img)
{
  img.addEventListener('click', function()
  {
    var src = img.getAttribute('data-full') || img.src;
    document.getElementById('modalImg').src = src;
    document.getElementById('modal').style.display = 'flex';
  });
});
document.getElementById('modalClose').addEventListener('click', function()
{
  document.getElementById('modal').style.display = 'none';
  document.getElementById('modalImg').src = '';
});
document.getElementById('modal').addEventListener('click', function(e)
{
  if(e.target === this) 
  { 
    this.style.display = 'none'; 
    document.getElementById('modalImg').src = ''; 
  }
});