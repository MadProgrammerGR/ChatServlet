import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.Date;
import java.util.Enumeration;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@WebServlet("/messageHandler")
public class MessageHandler extends HttpServlet {
	private static final long serialVersionUID = 1L;
	private Message prevMsg = new Message();
	
	@Override
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		synchronized (prevMsg) {
			try {
				prevMsg.wait();
			} catch (InterruptedException e) { } 
			response.addHeader("name", prevMsg.sender);
			response.getWriter().append(prevMsg.text).flush();
		}
	}
	
	@Override
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		synchronized (prevMsg) {
			prevMsg.sender = request.getParameter("name");
			prevMsg.text = request.getParameter("message");
			prevMsg.notifyAll();
		}
	}

}

class Message {
	String sender;
	String text;
}
