package com.neusoft.library.modules.sys.web;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
/**
 * 普通用户Controller
 *  
 * @version 2019-02-20
 */
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.alibaba.druid.util.StringUtils;
import com.alibaba.fastjson.JSONObject;
import com.aliyuncs.exceptions.ClientException;
import com.neusoft.library.common.config.Global;
import com.neusoft.library.common.security.Cryptos;
import com.neusoft.library.common.security.Digests;
import com.neusoft.library.common.utils.CookieUtils;
import com.neusoft.library.common.utils.Encodes;
import com.neusoft.library.modules.sys.entity.FontUser;
import com.neusoft.library.modules.sys.entity.User;
import com.neusoft.library.modules.sys.security.SystemAuthorizingRealm.Principal;
import com.neusoft.library.modules.sys.service.FontUserService;
import com.neusoft.library.modules.sys.service.SystemService;
import com.neusoft.library.modules.sys.utils.EmailVerificationCodeUtils;
import com.neusoft.library.modules.sys.utils.PhoneVerificationCodeUtils;
import com.neusoft.library.modules.sys.utils.UserUtils;

@Controller
@RequestMapping(value = "${frontPath}/sys/font")
public class FontUserController {

	@Autowired
	private FontUserService fontUserService;

	/**
	 * 前端登录
	 */
	@RequestMapping(value = "/login", method = RequestMethod.POST)
	@ResponseBody
	public JSONObject userLogin(HttpServletRequest request, String nameOrEmail, String password) {
		JSONObject jsonObject = new JSONObject();
		User user = fontUserService.getUserByLoginNameOrEmail(nameOrEmail);
		if (user != null) {
			// 验证密码
			/* if (EncryptUtils.validate(password, user.getPassword())) */
			
			byte[] salt = Encodes.decodeHex(user.getPassword().substring(0,16));
			if (SystemService.validatePassword(password,user.getPassword())) {
				jsonObject.put("code", 0);
				final HttpSession session = request.getSession(true);
				user.setPassword("");
				session.setAttribute("user", user);
			} else {
				jsonObject.put("code", 1);
			}
		} else {
			jsonObject.put("code", 1);
		}
		return jsonObject;
	}
	
	
	@RequestMapping(value = "/loginOut", method = RequestMethod.POST)
	@ResponseBody
	public JSONObject loginOut(HttpServletRequest request) {
		JSONObject jsonObject = new JSONObject();
	
		try {
			
			jsonObject.put("code", 0);
			final HttpSession session = request.getSession(true);
			session.setAttribute("user", null);
		} catch (Exception e) {
			// TODO: handle exception
			jsonObject.put("code", 1);

		}
	
		return jsonObject;
	}
	
}
