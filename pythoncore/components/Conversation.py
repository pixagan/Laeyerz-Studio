from laeyerz.conversations.Conversations import Conversations
import uuid

class ConversationComponent:
    def __init__(self):
        self.messages = []
        self.id = str(uuid.uuid4())


    def add_message(self, query, message):
        self.messages.append(
            {"id": str(uuid.uuid4()),
             "role": "user",
             "query": query,
             "response": message
             }
        )

    
    def get_messages(self):
        return self.messages


    def get_message(self, message_id):
        return self.messages.filter(lambda x: x["id"] == message_id)


    def get_message_count(self):
        return len(self.messages)



    def export(self):
        return self.messages

