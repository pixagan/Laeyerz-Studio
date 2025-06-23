# Created: Anil Variyar
# Playground App


import os

from fastapi import FastAPI, HTTPException, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from pypdf import PdfReader
from io import BytesIO

from pydantic import BaseModel
from typing import List, Optional
import uvicorn

from dotenv import load_dotenv
load_dotenv()

from components.AppState import AppState
from components.Config import Config

from components.DataSource import DataSource
from components.DataPad import DataPad

from components.VectorStore import VectorStoreComponent

from components.LLM import LLMComponent
from components.Conversation import ConversationComponent



# Example Pydantic model for data validation
class Conversation(BaseModel):
    title: str

class Chat(BaseModel):
    instructions: str
    query: str

class NodeInput(BaseModel):
    id: str
    type: str
    model: str
    inputs: dict

class VectorStoreSearchQuery(BaseModel):
    searchQuery: str

class LLMRequest(BaseModel):
    prompt: dict
    llm_settings: dict
    useMemoryStr: str


class DataSourceRequest(BaseModel):
    source_type: str
    source_data: str




class LaeyerzPlayground:

    def __init__(self):
        print("Initializing Laeyerz App Backend")

        self.api =  FastAPI(
                                title="Laeyerz Playground API",
                                description="Backend API for Laeyerz-Flow Application",
                                version="1.0.0"
                            )

        self.api.add_middleware(
                                    CORSMiddleware,
                                    allow_origins=["http://localhost:8110"],  # Add your React app's URL here
                                    allow_credentials=True,
                                    allow_methods=["*"],  # Allows all methods
                                    allow_headers=["*"],  # Allows all headers
                                )



        self.setup_routes()


        self.state = {
            "isLoaded":False,
            "isChunks":False
        }


        self.Config      = Config()
        self.DataSource  = DataSource()
        self.DataPad     = DataPad()
        
        self.LLM         = LLMComponent("OpenAI", "gpt-4o")
        self.conversation = ConversationComponent()

        self.VectorStore = VectorStoreComponent()
        self.VectorStore.setup_store("Faiss", {})

        self.prompts = []

        self.chats = []
        

        self.setup_routes()



    def setup_routes(self):


        #----------Sessions -----------
        # Basic CRUD routes
        @self.api.get("/")
        async def root():
            return {"message": "Welcome to Laeyerz-Playground API"}


        #--------------- Playground -----------

        @self.api.get("/api/playground")
        async def get_playground():
            return {"playground": {}}



        @self.api.get("/api/playground/state")
        async def get_playground():
            return {"playground": {}}




        @self.api.post("/api/playground/llm")
        async def post_playground_llm(llm_request: LLMRequest):

            instructions = llm_request.prompt["instruction"]
            query = llm_request.prompt["query"]
            memories = []
            params = llm_request.llm_settings

            vector_store_responses = []
            if llm_request.useMemoryStr == "Yes":
                vector_store_responses  = self.VectorStore.search(query)
            if len(vector_store_responses) > 0:
                for response in vector_store_responses:
                    memories.append(response["metadata"])


            llm_response     = self.LLM.run(instructions, query, memories, params)
            

            self.chats.append(llm_response)

            return {"llm_response": llm_response}



    #---------------------------------------------------------------


        @self.api.get("/api/playground")
        async def get_laeyerz():
            return {"playground": {}}



        @self.api.get("/api/playground/datapad/input")
        async def get_playground_data():

            self.DataSource.load_data("text","../samplefiles/example.txt")

            self.DataPad.clear_all()
            self.DataPad.add_page(self.DataSource.data)


            return {"pages": self.DataPad.pages, "chunks": self.DataPad.chunks}




        @self.api.post("/api/upload")
        async def upload_file(file: UploadFile = File(...)):

            if not file.filename.endswith(".pdf"):
                return JSONResponse(content={"error": "Only PDF files are allowed"}, status_code=400)

            content = await file.read()
            from io import BytesIO
            reader = PdfReader(BytesIO(content))


            self.DataPad.clear_all()

            text_by_page = ""
            for i, page in enumerate(reader.pages):
                text = page.extract_text()
                text_by_page += text + "\n"


            datas = {
                "datatype": "text",
                "data": text_by_page
            }

            self.DataPad.add_page(datas)


            return {"pages": self.DataPad.pages, "chunks": self.DataPad.chunks}




        @self.api.get("/api/playground/datasource")
        async def get_playground_data():

            self.DataSource.load_data("text","../samplefiles/example.txt")

            self.DataPad.clear_all()
            self.DataPad.add_page(self.DataSource.data)

            return {"pages": self.DataPad.pages, "chunks": self.DataPad.chunks}





        @self.api.get("/api/playground/reset")
        async def get_playground_reset():

            self.DataPad.clear_all()
            self.DataSource.clear_data()
            self.VectorStore.clear()

            return {"pages": self.DataPad.pages, "chunks": self.DataPad.chunks}



        @self.api.get("/api/playground/datapad")
        async def get_playground_datapad():

            self.DataPad.add_page(self.DataSource.data)


            return {"pages": self.DataPad.pages, "chunks": self.DataPad.chunks}




        @self.api.get("/api/playground/datapad/input")
        async def get_playground_datapad_input():

            self.DataSource.load_data("text","../samplefiles/example.txt")

            self.DataPad.clear_all()
            self.DataPad.add_page(self.DataSource.data)

            return {"pages": self.DataPad.pages, "chunks": self.DataPad.chunks}



        @self.api.get("/api/playground/datapad/process")
        async def get_playground_datapad_process():

            self.DataPad.clean_text()
            self.DataPad.split_text()

            return {"pages": self.DataPad.pages, "chunks": self.DataPad.chunks}





        @self.api.get("/api/playground/vectorstore")
        async def get_playground_vectorstore():

            self.VectorStore.setup_store("Faiss", config["VectorDB_Params"])

            return {"playground": {}}




        @self.api.post("/api/playground/vectorstore/store")
        async def vectorstore_store():

            self.VectorStore.store(self.DataPad.chunks[0])

            return {"playground": {}}


        @self.api.post("/api/playground/vectorstore/search")
        async def post_playground_vectorstore_search(query: VectorStoreSearchQuery):

            responses  = self.VectorStore.search(query.searchQuery)

            return JSONResponse(content={"response": responses})


     


    def run(self):
        uvicorn.run(self.api, host="0.0.0.0", port=8101)



#------------------------------



def main():
 
    lplay = LaeyerzPlayground()
    lplay.run()

if __name__ == "__main__":
    main()

