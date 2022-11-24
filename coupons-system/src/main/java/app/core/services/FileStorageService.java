package app.core.services;

import java.io.File;
import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;

import javax.annotation.PostConstruct;
import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

@Service
@Transactional
public class FileStorageService {
	
	@Value ("${file.upload-directory}")
	private String uploadDirectory;
	private Path fileStoragePath;
	
	
	
	@PostConstruct
	public void init() {
		
		// path
		this.fileStoragePath = Paths.get(this.uploadDirectory).toAbsolutePath().normalize();
		
		// create dir
		try {
			Files.createDirectories(fileStoragePath);
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
	
	
	
	
	
	/**get a multipart file from front end, turn it into File object,
	 * and saves it. if file already exists, replace it.
	 * @param file
	 * @return the file name (string)
	 */
	public String storeFile (MultipartFile file) {
		
        // normalize file name
		String fileName = StringUtils.cleanPath(file.getOriginalFilename());
	
			
		// check for name validity
		if (fileName.contains("..")) {
			throw new RuntimeException(".. is invalid character");
		}
		
		// give path to the uploaded file
		Path targetLocation = this.fileStoragePath.resolve(fileName);
	
		
	    // copy temporary file to a regular file in target location
		try {
			Files.copy(file.getInputStream(), targetLocation, StandardCopyOption.REPLACE_EXISTING);
			return fileName;
		
		} catch (IOException e) {
			throw new RuntimeException("storeFile failed: " + fileName, e);
		}
	}
	
	
	
	
	/** Download file from server to user
	 * @param fileName
	 * @return Resource
	 */
	public Resource loadFileAsResource (String fileName) {
		
		try {
			// get path to the resource
			Path filePath = this.fileStoragePath.resolve(fileName).normalize();
			
			// create resource object from the path
			Resource resource = new UrlResource(filePath.toUri());
			
			// return the resource
			if (resource.exists()) {
				return resource;
			} else {
				throw new RuntimeException("file not found");
			}
			
		} catch (MalformedURLException e) {
			throw new RuntimeException("file not found", e);
		}
	}
	
	
	
	/** delete file from the hard disc by file name
	 * @param fileName
	 * @return true if successful
	 */
	public boolean deleteFile(String fileName) {
		
		// get the path to the file
		Path filePath = this.fileStoragePath.resolve(fileName).normalize();
			
		// get the file
		File file = filePath.toFile();
			
		// delete the file
		if (file.exists()) {
			return file.delete();
		} else {
			throw new RuntimeException();
		}
	}
	
	
	
	
	
	
	
	
	

}
