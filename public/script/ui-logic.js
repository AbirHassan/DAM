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

let canvasHeight = $('.upper-canvas').height();
$('.side').css("position", "absolute");
$('.side').css("margin-top", `${canvasHeight}px`);