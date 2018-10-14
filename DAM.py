from flexx import flx

class Map(flx.PyComponent):
    """ The Python side of the app. There is one instance per connection.
    """

    color = flx.ColorProp(settable=True, doc="Paint color")

    status = flx.StringProp('', settable=True, doc="Status text")

    def init(self):
        self.set_color('#fff')
        self.widget = Map(self)
        self._update_participants()


class MapView(flx.Widget):
	def init(self, model):
		with flx.VBox():
			flx.Label(flex=0, text=lambda: model.status)
			flx.Widget(flex=1)
			with flx.HBox(flex=2):
				flx.Widget(flex=1)
				self.canvas = flx.CanvasWidget(flex=0, minsize=400, maxsize=400)
				flx.Widget(flex=1)
			flx.Widget(flex=1)

		self._ctx = self.canvas.node.getContext('2d')

if __name__ == '__main__':
    a = flx.App(Map)
    a.serve()
    # m = a.launch('browser')  # for use during development
    flx.start()