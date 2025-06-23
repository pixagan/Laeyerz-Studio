from laeyerz.llms.LLMx import LLMx


class LLMComponent:
    def __init__(self, vendor, model):
        self.llm = LLMx(config={"vendor": vendor, "model": model})

    def run(self, instructions, query, memories, params={}):
        llm_response = self.llm.run(instructions, query, memories, params)
        llm_response["instructions"] = instructions
        llm_response["query"] = query
        llm_response["memories"] = memories
        llm_response["params"] = params
        
        return llm_response
