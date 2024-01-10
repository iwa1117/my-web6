roller;
import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.gson.Gson;

import model.BMI;

@WebServlet("/GetData")
public class GetData extends HttpServlet {
	private static final long serialVersionUID = 1L;

	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		request.setCharacterEncoding("utf-8");
		String heightStr=request.getParameter("height");
		String weightStr=request.getParameter("weight");

		heightStr=heightStr==null? "1":heightStr;
		weightStr=weightStr==null? "0":weightStr;
		double heightCm=Double.parseDouble(heightStr);
		double weightKg=Double.parseDouble(weightStr);
		double bmi=weightKg/Math.pow((heightCm/100) ,2 );
		String fileName;
		if(bmi<18.5) {
			fileName="img1.jpg";
		}else if(bmi < 25) {
			fileName="img2.jpg";
		}else if(bmi<30) {
			fileName="img3.jpg";
		}else if(bmi < 35) {
			fileName="img4.jpg";
		}else if(bmi<40) {
			fileName="img5.jpg";
		}else {
			fileName="img6.jpg";
		}
		String imgPath="http://localhost:5173/BMI_API/images/"+fileName;
		BMI b=new BMI();
		b.setHeight(heightCm);
		b.setWeight(weightKg);
		b.setBmi(Math.round(bmi*100)/100d);
		b.setImgPath(imgPath);
		response.setContentType("application/json;charset=utf-8");
		PrintWriter out =response.getWriter();
		Gson gson=new Gson();
		out.print(gson.toJson(b));
	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		doGet(request, response);
	}