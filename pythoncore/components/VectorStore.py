from laeyerz.memory.vectordbs.FAISSAdapter import FaissAdapter
from laeyerz.embeddings.EmbeddingModel import EmbeddingModel

import uuid

class VectorStoreComponent:

    def __init__(self):
        self.name = "VectorStore"
        self.vector_store = None


    def setup_store(self, store_type, store_params):
        
        self.embedding_model = EmbeddingModel()
        self.vector_store    = FaissAdapter(384)


    def store(self, data):

        embeddings = self.embedding_model.encode(data)

        metadata = [{"id": str(uuid.uuid4()), "metadata": {"text": chunk}} for chunk in data]

        #combine embeddings with metadata
        self.vector_store.store(embeddings, metadata)



    def search(self, query):

        query_embedding = self.embedding_model.encode(query)
        query_embedding = query_embedding.reshape(1, -1)
        responses       = self.vector_store.search(query_embedding)


        return responses



    def clear(self):
        self.vector_store = None



    def export(self):
        return self.vector_store.export()
