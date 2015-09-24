import com.mongodb.MongoClient;
import com.mongodb.client.MongoDatabase;

public class DB {
	@SuppressWarnings("resource")
	public static MongoDatabase connect(String ip, int port, String dbname){
		return new MongoClient(ip, port).getDatabase(dbname);
	}
};
