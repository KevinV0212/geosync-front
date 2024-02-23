import MockAxios from "axios";
import { deleteWikiEntry } from "../wikiUtil";

describe("deleteWikiEntry", () => {
   it("should not call axios if the wikiEntryID is not present", async () => {
      await deleteWikiEntry(null);
      expect(MockAxios.request).not.toHaveBeenCalled();
   });

   it("should console log message if wikiEntry is successfully deleted", async () => {
      const mockwikiEntryID = 1;
      const mockResponse = {
         status: 200,
      };
      MockAxios.request.mockResolvedValueOnce(mockResponse);

      const logSpy = jest.spyOn(console, "log");
      await deleteWikiEntry(mockwikiEntryID);

      // assertions for console log
      expect(logSpy).toHaveBeenCalled();
      expect(logSpy).toHaveBeenCalledTimes(1);
      expect(logSpy).toHaveBeenCalledWith(
         `Wiki Entry ${mockwikiEntryID} Successfully Deleted`
      );

      logSpy.mockRestore();
   });

   // ERROR CASES ----------------------------------------------------------------------

   it("should console.log information of an error with a response property", async () => {
      const mockError = {
         response: {
            data: "data",
            status: "status",
            headers: "headers",
         },
      };

      MockAxios.request.mockImplementationOnce(() => {
         return Promise.reject(mockError);
      });

      const logSpy = jest.spyOn(console, "log");
      const countries = await deleteWikiEntry(1);

      // assertions for console log
      expect(logSpy).toHaveBeenCalled();
      expect(logSpy).toHaveBeenCalledTimes(3);
      expect(logSpy).toHaveBeenCalledWith(mockError.response.data);
      expect(logSpy).toHaveBeenCalledWith(mockError.response.status);
      expect(logSpy).toHaveBeenCalledWith(mockError.response.headers);

      logSpy.mockRestore();
   });

   it("should console.log information of an error with a request property", async () => {
      const mockError = {
         request: "request",
      };

      MockAxios.request.mockImplementationOnce(() => {
         return Promise.reject(mockError);
      });

      const logSpy = jest.spyOn(console, "log");
      const countries = await deleteWikiEntry(1);

      // assertions for console log
      expect(logSpy).toHaveBeenCalled();
      expect(logSpy).toHaveBeenCalledTimes(1);
      expect(logSpy).toHaveBeenCalledWith(mockError.request);

      logSpy.mockRestore();
   });

   it("should console.log information of any other error", async () => {
      const mockError = {
         message: "message",
      };

      MockAxios.request.mockImplementationOnce(() => {
         return Promise.reject(mockError);
      });

      const logSpy = jest.spyOn(console, "log");
      const countries = await deleteWikiEntry(1);

      // assertions for console log
      expect(logSpy).toHaveBeenCalled();
      expect(logSpy).toHaveBeenCalledTimes(1);
      expect(logSpy).toHaveBeenCalledWith("Error", mockError.message);

      logSpy.mockRestore();
   });
});
