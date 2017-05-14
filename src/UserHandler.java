

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.simple.JSONArray;

import jdk.nashorn.internal.parser.JSONParser;

/**
 * Servlet implementation class UserHandler
 */
@WebServlet("/userHandler")
public class UserHandler extends HttpServlet {
	private static final long serialVersionUID = 1L;
	private List<String> users = new ArrayList<String>();
	private Object lock = new Object();
       
	@Override
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		String event = request.getParameter("event");
		if(event.equals("new user")) {
			synchronized (lock) {
				try {
					lock.wait();
				} catch (InterruptedException e) { }
				String prevUser = users.get(users.size()-1);
				response.addHeader("name", prevUser);
			}
		}else if(event.equals("online users")){
			response.getWriter().append(JSONArray.toJSONString(users)).flush();
		}
	}

	@Override
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		synchronized (lock) {
			String user = request.getParameter("name");
			users.add(user);
			lock.notifyAll();			
		}
	}

}
