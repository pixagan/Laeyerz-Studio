from laeyerz.connectors.fileio.TextLoader import TextLoader

class DataSource:

    def __init__(self):

        self.source_type = "DataSource"
        self.data  = {}


    def clear_data(self):
        self.data = {}


    def load_data(self, datatype, data):

        filedata = None

        if(datatype == "input"):
            filedata = data

        if(datatype == "text"):
            filedata = TextLoader().load(data)


        # elif(datatype == "pdf"):
        #     self.data = PyPDFLoader(data).load()
        # elif(datatype == "csv"):
        #     self.data = CSVLoader(data).load()
        # elif(datatype == "excel"):
        #     self.data = ExcelLoader(data).load()
            

        self.data = {
            "datatype": datatype,
            "data": filedata
        }


    def load_data_source(self, data_source):

        if(data_source.source_type == "File"):
            self.data = data_source.data



    def get_data(self):
        return self.data
    
    

    def export(self):
        return self.data



#----------------------------------------------------------------------


def main():

  
    
    data_source = DataSource()

   
    


#----------------------------------------------------------------------

if __name__ == "__main__":
    main()


#----------------------------------------------------------------------

     
