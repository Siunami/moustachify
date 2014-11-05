var video = document.querySelector('.js-input-video'),
videoInput = document.querySelector('.js-input-video'),
ctracker = new clm.tracker(),
frameId = null,
$tacheContainer = $('.js-tache-container'),
tache = null;
imgFolder = 'img/'

/* tache json */
var taches = [
  {
    'img': 'tache-1.svg',
    'top': 0
  },
  {
    'img': 'tache-4.png',
    'top': 0
  },
  {
    'img': 'tache-5.png',
    'top': 0
  },
  {
    'img': 'tache-7.png',
    'top': 0
  },
  {
    'img': 'tache-8.png',
    'top': 0
  },
  {
    'img': 'tache-9.png',
    'top': 0
  },
  {
    'img': 'tache-10.png',
    'top': 0
  },
  {
    'img': 'tache-11.png',
    'top': 0
  },
  {
    'img': 'tache-12.png',
    'top': 0
  },
  {
    'img': 'tache-14.png',
    'top': 0
  },
  {
    'img': 'tache-15.png',
    'top': 0
  },
  {
    'img': 'tache-16.png',
    'top': 0
  },
  {
    'img': 'tache-17.png',
    'top': 0
  },
  {
    'img': 'tache-18.png',
    'top': 0
  },
  {
    'img': 'tache-19.png',
    'top': 0
  }
]

tache = imgFolder+''+taches[0]['img']

setCam = function()
{
  navigator.getUserMedia  = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia ||navigator.msGetUserMedia;

  if (navigator.getUserMedia) 
  {
    navigator.getUserMedia({audio: false, video: true}, function(stream) 
    {
      video.src = window.URL.createObjectURL(stream);
    }, function(error){console.log(error)});
  }

  ctracker.init(pModel);
  ctracker.start(videoInput);

}


positionLoop = function() {

  frameId = requestAnimationFrame(positionLoop);
  positions = ctracker.getCurrentPosition();
  // pos 44 - 50
  if (positions)
  {
    if ($('.js-input-video').hasClass('hidden'))
    {
      $('.js-input-video').removeClass('hidden');
    }

  	pos = positions.slice(44, 52)
  	//console.log(pos)

  	start = pos[0]
  	end = pos[pos.length-1]
  	// get first and last compare width to create the width of the moustache
  	// set top and left on moustache based on first value

  	diff = 40
  	
  	width = (end[0] + diff) - (start[0] - diff)
    // set height from loaded in tache

    //rotate = (end[1] - start[1]) - 1
    // roate based on head movement not lip movement
    rotate = ((positions[11][1] - positions[3][1]) + 10) / 3

    $overlay = $('.js-overlay')

    if ($overlay.find('.js-tache').length == 0)
    {
      $div = $('<div class="js-tache"><div>')
      $overlay.append($div[0]);
    }
    else 
    {
      $div = $overlay.find('.js-tache')
    }
      
    // detect max top
    $div.css({
      'position': 'absolute',
      'left': (start[0] - diff),
      'top': (start[1] - (diff + (diff*0.25))),
      'width': width,
      'height': 40,
      'background-image': 'url('+tache+')',
      'background-size': '100% 100%',
      'background-position': 'center',
      'background-repeat': 'no-repeat',
      'transform': 'rotate('+rotate+'deg)'
    });

  	//cancelAnimationFrame(frameId)
  }
  	
}

renderMoustacheOptions = function()
{
  
  amount = 270
  left = 20

  for (var i = 0; i < taches.length; i++)
  {
    style = 'style="left:'+left+'px;position:absolute;';
    style = '';

    $tacheContainer.append('<div class="tache-option" '+style+'><img class="svg" src="'+imgFolder+''+taches[i]['img']+'"></div>')
    left+=amount
  }

  $('.tache-option').on('click', function(event){
    tache = $($(this).find('img')).attr('src');
    //tache.css('fill', 'brown');
  });
  /*
  $('.js-left').on('click', function()
  {
    if ()
  })*/
  
}

setCam();
positionLoop();
renderMoustacheOptions();