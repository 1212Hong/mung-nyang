//package com.mung.mung.api.controller;
//
//import java.util.List;
//import java.util.Map;
//import java.util.concurrent.ConcurrentHashMap;
//
//import io.openvidu.java.client.*;
//import org.springframework.beans.factory.annotation.Value;
//import org.springframework.http.HttpStatus;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.PathVariable;
//import org.springframework.web.bind.annotation.RequestBody;
//import org.springframework.web.bind.annotation.RequestMapping;
//import org.springframework.web.bind.annotation.RequestMethod;
//import org.springframework.web.bind.annotation.RestController;
//
//@RestController
//public class OpenviduRecordCotroller {
//
//    @RequestMapping("/api/recording")
//    public class MyRestController {
//
//        // OpenVidu object as entrypoint of the SDK
//        private OpenVidu openVidu;
//
//        // Collection to pair session names and OpenVidu Session objects
//        private Map<String, Session> mapSessions = new ConcurrentHashMap<>();
//        // Collection to pair session names and tokens (the inner Map pairs tokens and
//        // role associated)
//        private Map<String, Map<String, OpenViduRole>> mapSessionNamesTokens = new ConcurrentHashMap<>();
//        // Collection to pair session names and recording objects
//        private Map<String, Boolean> sessionRecordings = new ConcurrentHashMap<>();
//
//        // URL where our OpenVidu server is listening
//        private String OPENVIDU_URL;
//        // Secret shared with our OpenVidu server
//
//        private String SECRET;
//
//        public MyRestController(@Value("${OPENVIDU_SECRET}") String secret, @Value("${OPENVIDU_URL}") String openviduUrl) {
//            this.SECRET = secret;
//            this.OPENVIDU_URL = openviduUrl;
//            this.openVidu = new OpenVidu(OPENVIDU_URL, SECRET);
//        }
//        /*******************/
//        /** Recording API **/
//        /*******************/
//
//        @RequestMapping(value = "/start", method = RequestMethod.POST)
//        public ResponseEntity<?> startRecording(@RequestBody Map<String, Object> params) {
//            String sessionId = (String) params.get("session");
////            Recording.OutputMode outputMode = Recording.OutputMode.valueOf((String) params.get("outputMode"));
//            Recording.OutputMode outputMode = Recording.OutputMode.COMPOSED;
////            boolean hasAudio = (boolean) params.get("hasAudio");
////            boolean hasVideo = (boolean) params.get("hasVideo");
//            boolean hasAudio = true;
//            boolean hasVideo = true;
//
//
//
//            RecordingProperties properties = new RecordingProperties.Builder().outputMode(outputMode).hasAudio(hasAudio)
//                    .hasVideo(hasVideo).build();
//
//            System.out.println("Starting recording for session " + sessionId + " with properties {outputMode=" + outputMode
//                    + ", hasAudio=" + hasAudio + ", hasVideo=" + hasVideo + "}");
//
//            try {
//                Recording recording = this.openVidu.startRecording(sessionId, properties);
//                this.sessionRecordings.put(sessionId, true);
//                return new ResponseEntity<>(recording, HttpStatus.OK);
//            } catch (OpenViduJavaClientException | OpenViduHttpException e) {
//                return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
//            }
//        }
//
//        @RequestMapping(value = "/stop", method = RequestMethod.POST)
//        public ResponseEntity<?> stopRecording(@RequestBody Map<String, Object> params) {
//            String recordingId = (String) params.get("recording");
//
//            System.out.println("Stoping recording | {recordingId}=" + recordingId);
//
//            try {
//                Recording recording = this.openVidu.stopRecording(recordingId);
//                this.sessionRecordings.remove(recording.getSessionId());
//                return new ResponseEntity<>(recording, HttpStatus.OK);
//            } catch (OpenViduJavaClientException | OpenViduHttpException e) {
//                return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
//            }
//        }
//
//        @RequestMapping(value = "/delete", method = RequestMethod.DELETE)
//        public ResponseEntity<?> deleteRecording(@RequestBody Map<String, Object> params) {
//            String recordingId = (String) params.get("recording");
//
//            System.out.println("Deleting recording | {recordingId}=" + recordingId);
//
//            try {
//                this.openVidu.deleteRecording(recordingId);
//                return new ResponseEntity<>(HttpStatus.OK);
//            } catch (OpenViduJavaClientException | OpenViduHttpException e) {
//                return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
//            }
//        }
//
//        @RequestMapping(value = "/get/{recordingId}", method = RequestMethod.GET)
//        public ResponseEntity<?> getRecording(@PathVariable(value = "recordingId") String recordingId) {
//
//            System.out.println("Getting recording | {recordingId}=" + recordingId);
//
//            try {
//                Recording recording = this.openVidu.getRecording(recordingId);
//                return new ResponseEntity<>(recording, HttpStatus.OK);
//            } catch (OpenViduJavaClientException | OpenViduHttpException e) {
//                return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
//            }
//        }
//
//        @RequestMapping(value = "/list", method = RequestMethod.GET)
//        public ResponseEntity<?> listRecordings() {
//
//            System.out.println("Listing recordings");
//
//            try {
//                List<Recording> recordings = this.openVidu.listRecordings();
//
//                return new ResponseEntity<>(recordings, HttpStatus.OK);
//            } catch (OpenViduJavaClientException | OpenViduHttpException e) {
//                return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
//            }
//        }
//    }
//}
