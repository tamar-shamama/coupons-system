package app.core.controllers;


import java.io.IOException;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import app.core.services.FileStorageService;

@RestController
@RequestMapping("api/file")
@CrossOrigin (origins = "http://localhost:3000")
public class ImageController {
	
	@Autowired
	private FileStorageService fileStorageService;

	 
	
	/** uploading a single file from user to the server
	 * @param file
	 * @return file name (String)
	 */
	@PostMapping("/uploadFile")
	public String uploadFile(@RequestParam MultipartFile file) {

		try {
			return this.fileStorageService.storeFile(file);
		} catch (Exception e) {
			throw new ResponseStatusException(HttpStatus.BAD_REQUEST, generateErrorMsg(e));
		}
	}
	
	
	

	/**downloading file from server to user by file name on path
	 * @param fileName
	 * @param request
	 * @return ResponseEntity<Resource>
	 */
	@GetMapping("/dowloadFile/{fileName}")
	public ResponseEntity<Resource> downloadFile(@PathVariable String fileName, HttpServletRequest request) {
		
		String contentType = null;
		
		// create a resource file from the real file
		Resource resource = this.fileStorageService.loadFileAsResource(fileName);
		
		// get the type of the file (not always necessary)
		try {
			contentType = request.getServletContext().getMimeType(resource.getFile().getAbsolutePath());
		} catch (IOException e) {
			System.out.println("failed to determine file type");
		}

		// if previous step failed, set type as octet stream
		if (contentType == null) {
			contentType = MediaType.APPLICATION_OCTET_STREAM_VALUE;
		}

		return ResponseEntity

				.ok()  // create ResponseEntity builder with status ok
				.contentType(MediaType.parseMediaType(contentType))  // enter the type into the response
//				.header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + resource.getFilename() + "\"")  // the header of the response  - attachment: a link to download
				.header(HttpHeaders.CONTENT_DISPOSITION, "inline; filename=\"" + resource.getFilename() + "\"")      // the header of the response - inline: a new tab with the file showed
				.body(resource);  // the body of the ResponseEntity - the file is here
	}
	
	
	
	
	
	/** deletes a file from the hard disc by file name given on path from user
	 * @param fileName
	 * @return true if successful
	 */
	@DeleteMapping("/{fileName}")
	public boolean deleteFile(@PathVariable String fileName) {

		try {
			return this.fileStorageService.deleteFile(fileName);
		} catch (Exception e) {
			throw new ResponseStatusException(HttpStatus.NOT_FOUND, generateErrorMsg(e));
		}
	}
	
	
	
	
	
	/** create a simpler error message out of an error
	 * @param e
	 * @return String (message)
	 */
	private String generateErrorMsg(Exception e) {
		
		String msg = e.getMessage();
		Throwable t = e.getCause();
		
		while (t != null) {
			msg += " => " + t.getClass().getSimpleName();
			t = t.getCause();
		}
		return msg;
	}

}
