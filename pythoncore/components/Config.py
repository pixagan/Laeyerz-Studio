



class Config:

    def __init__(self):
        self.components = []

    def add_component(self, component):
        self.components.append(component)

    def get_components(self):
        return self.components

    def ref_component(self, name):
        for component in self.components:
            if component.name == name:
                return component
        return None

    def remove_component(self, name):
        for component in self.components:
            if component.name == name:
                self.components.remove(component)
                return True
        return False
       


