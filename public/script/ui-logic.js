$('.dropdown-item').on('click', function() {
	let clicked = '#'+$(this).text();
	let items = ['#roads', '#background'];
	items.forEach(function(item) {
		$(item).hide();
	});
	$(clicked).show();
});

$('#myTab a').on('click', function (e) {
	e.preventDefault();
	$(this).tab('show');
});

let navTabsHeight = $('.nav-tabs').height();
let furnitureHeight = $('.furniture').height();

$('.furniture').css("height", furnitureHeight - navTabsHeight);
let canvasHeight = $('.upper-canvas').height();
$('.section').css("position", "absolute");