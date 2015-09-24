import java.io.IOException;

import org.bson.Document;

import com.mongodb.client.MongoDatabase;

import twitter4j.StallWarning;
import twitter4j.Status;
import twitter4j.StatusDeletionNotice;
import twitter4j.StatusListener;
import twitter4j.TwitterException;
import twitter4j.TwitterStream;
import twitter4j.TwitterStreamFactory;

public class twitter {
	public static void main(String[] args) throws TwitterException, IOException {
		MongoDatabase db = DB.connect("localhost", 27017, "prefa");
		System.out.println("db connect.......");
		
		TwitterStream twitterStream = new TwitterStreamFactory().getInstance();
        StatusListener listener = new StatusListener() {
            @Override
            public void onStatus(Status status) {
            	Article article = new Article();
            	article.setScrname(status.getUser().getScreenName());
            	article.setText(status.getText());
            	article.setDate(status.getCreatedAt());
            	article.setURL("https://twitter.com/" + status.getUser().getScreenName() + "/status/" + status.getId());
            	
            	Document document = new Document();
        		document.append("scrname", article.getScrname());
        		document.append("text", article.getText());
        		document.append("date", article.getDate());
        		document.append("url", article.getURL());
        		db.getCollection("article").insertOne(document);
            	
            	System.out.println("insert complete.........");
            	System.out.println("@" + status.getUser().getScreenName());
            	System.out.println(status.getText());
            	System.out.println(status.getCreatedAt());
            	System.out.println("https://twitter.com/" + status.getUser().getScreenName() 
    + "/status/" + status.getId());
            	System.out.println("------------------------------------------\n");
                
            }

            @Override
            public void onDeletionNotice(StatusDeletionNotice statusDeletionNotice) {
            }

            @Override
            public void onTrackLimitationNotice(int numberOfLimitedStatuses) {
            }

            @Override
            public void onScrubGeo(long userId, long upToStatusId) {
            }

            @Override
            public void onStallWarning(StallWarning warning) {
            }

            @Override
            public void onException(Exception ex) {
            	try {
					Thread.sleep(5000);
				} catch (InterruptedException e) {
					e.printStackTrace();
				}
            }
        };   
        twitterStream.addListener(listener);
        twitterStream.sample("ko");
	}
}