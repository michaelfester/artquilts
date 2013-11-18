@divSize = -1
@sortedByDate = true

$(window).resize ->
	resizeDelayed()

$(window).ready ->
	$('.copyright').css('opacity',0)

$(window).load ->
    $('.copyright').css('opacity',1)
    resizeDelayed()

resizeDelayed = ->
	window.clearTimeout(@timeout)
	@timeout = setTimeout(resize,100)

resize = ->
	newSize = $(_.first($('.gallery'))).width()
	if newSize == @divSize then return
	@divSize = newSize
	galleries = $('.gallery')
	$('.fill').remove()
	for gallery in galleries
		resizeGallery(gallery)

resizeGallery = (el) ->
	indices = []
	curTop = 0
	thumbs = $(el).find('.thumb')
	firstPass = true
	for imgEl in thumbs
		top = $(imgEl).offset().top
		if top == curTop then continue
		prevTop = curTop
		curTop = top
		if firstPass
			firstPass = false
			continue
		fill = $('<img/>', { class: 'fill', src: $(imgEl).attr('src')})
		fill.appendTo(el)
		fill.offset({ top: prevTop })

window.sortByDate = (byDate) ->
	return if @sortedByDate == byDate
	@sortedByDate = byDate
	if byDate
		$("#sortByDate").addClass("active")
		$("#sortBySize").removeClass("active")
	else
		$("#sortByDate").removeClass("active")
		$("#sortBySize").addClass("active")
	thumbs = $(".gallery a")
	if byDate
		sorted = _.sortBy thumbs, (el) -> $(el).attr('year')
	else
		sorted = _.sortBy thumbs, (el) ->
			x = parseFloat($(el).attr('dimens').split('x')[0])
			if isNaN(x) then x = Number.MAX_VALUE
			x
	gallery = _.first($('.gallery'))
	_.each thumbs, (el) -> el.remove()
	_.each sorted, (el) -> $(gallery).append(el)
	resize()