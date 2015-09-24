import java.util.Date;

public class Article {
	private String scrname;
	private String text;
	private Date date;
	private String url;
	
	public String getScrname(){
		return scrname;
	}
	
	public void setScrname(String scrname){
		this.scrname = scrname;
	}
	
	public String getText(){
		return text;
	}
	
	public void setText(String text){
		this.text = text;
	}
	
	public Date getDate(){
		return date;
	}
	
	public void setDate(Date date){
		this.date = date;
	}
	
	public String getURL(){
		return url;
	}
	
	public void setURL(String url){
		this.url = url;
	}

}
