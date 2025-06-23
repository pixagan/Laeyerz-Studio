from laeyerz.utils.textsplitters.TextSplitter import TextSplitter


class DataPad:

    def __init__(self):
        self.pages = []
        self.chunks = []

    def add_page(self, page):
        self.pages.append(page)

    def remove_page(self, page_no):
        self.pages.pop(page_no)

    def clear_all(self):
        self.pages = []
        self.chunks = []

    def clean_text(self):

        for page_no in range(len(self.pages)):
            self.pages[page_no]["data"] = self.pages[page_no]["data"].replace("\n", " ")

    
    def split_text(self):
        
        splitter = TextSplitter()

        for page_no in range(len(self.pages)):
            split_text = splitter.split(self.pages[page_no]["data"])
            
            self.chunks.insert(page_no, split_text)
        
        

    def export(self):
        return self.pages

