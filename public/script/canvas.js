
function initCanvas() {
    $('.canvas-container').each(function(index) {
        var canvasContainer = $(this)[0];
        var canvasObject = $("canvas", this)[0];
        var url = $(this).data('floorplan');
        var canvas = window._canvas = new fabric.Canvas(canvasObject);
        
        var loadedCanvas = {{{canvas}}} 
        if (loadedCanvas != false) {
        	canvas.loadFromJSON(loadedCanvas)
        }
        console.log({{{canvas}}});

        var window_width = $(window).width();
        var window_height = $(window).height() - $('.furniture').height();
        canvas.setHeight(window_height);
        canvas.setWidth(window_width);
        canvas.setBackgroundImage(url, canvas.renderAll.bind(canvas));
        
        var imageOffsetX, imageOffsetY;

        function handleDragStart(e) {
            [].forEach.call(images, function (img) {
                img.classList.remove('img_dragging');
            });
            this.classList.add('img_dragging');
          
          
            var imageOffset = $(this).offset();
            imageOffsetX = e.clientX - imageOffset.left;
            imageOffsetY = e.clientY - imageOffset.top;
        }

        function handleDragOver(e) {
            if (e.preventDefault) {
                e.preventDefault();
            }
            e.dataTransfer.dropEffect = 'copy';
            return false;
        }

        function handleDragEnter(e) {
            this.classList.add('over');
        }

        function handleDragLeave(e) {
            this.classList.remove('over');
        }

        function handleDrop(e) {
            e = e || window.event;
            if (e.preventDefault) {
              e.preventDefault();
            }
            if (e.stopPropagation) {
                e.stopPropagation();
            }
            var img = document.querySelector('.furniture img.img_dragging');
          
            var offset = $(canvasObject).offset();
            var y = e.clientY - (offset.top + imageOffsetY);
            var x = e.clientX - (offset.left + imageOffsetX);
          
            var newImage = new fabric.Image(img, {
                width: img.width,
                height: img.height,
                left: x,
                top: y
            });
            canvas.add(newImage);
            return false;
        }

        function handleDragEnd(e) {
            [].forEach.call(images, function (img) {
                img.classList.remove('img_dragging');
            });
        }
      
		var images = document.querySelectorAll('.furniture img');
		[].forEach.call(images, function (img) {
		img.addEventListener('dragstart', handleDragStart, false);
		img.addEventListener('dragend', handleDragEnd, false);
		});
		canvasContainer.addEventListener('dragenter', handleDragEnter, false);
		canvasContainer.addEventListener('dragover', handleDragOver, false);
		canvasContainer.addEventListener('dragleave', handleDragLeave, false);
		canvasContainer.addEventListener('drop', handleDrop, false);
    	
    	$('.metrics button').on('click', function() {
			let json = JSON.stringify(canvas);
			fetch('/addCanvas', {
				method: 'POST',
				headers: {
					"Content-Type": "application/json"
					},
				body: JSON.stringify({
					name: $('#inlineFormInput').val(),
					content: json
				})
			}).then(response => response.text())
		
		});
    });
}
initCanvas();
