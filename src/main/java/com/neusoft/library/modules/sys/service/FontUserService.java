package com.neusoft.library.modules.sys.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.neusoft.library.common.service.CrudService;
import com.neusoft.library.common.utils.CacheUtils;
import com.neusoft.library.modules.sys.dao.FontUserDao;
import com.neusoft.library.modules.sys.entity.FontUser;
import com.neusoft.library.modules.sys.entity.User;
import com.neusoft.library.modules.sys.utils.DictUtils;

/**
 * 日志Service
 *  
 */
@Service
@Transactional
public class FontUserService {
	@Autowired
	private FontUserDao fontUserDao;

    public User getUserByLoginNameOrEmail(String nameOrEmail) {

        return fontUserDao.getUserByLoginNameOrEmail(nameOrEmail);
    }

    
	/*public int addUser(FontUser fontUser) {
		FontUser existUserName = fontUserDao.findFontUserByNickname(fontUser.getNickname());
	        if (existUserName != null){
	            return 4;
	        }
	        if (fontUser.getPhoneNumber() != null){
	        	FontUser existPhone = fontUserDao.findFontUserByPhoneOrEmail(fontUser.getPhoneNumber());
	            if (existPhone != null){
	                return 2;
	            }
	        }
	        if (fontUser.getEmail() != null){
	        	FontUser existEmail = fontUserDao.findFontUserByPhoneOrEmail(fontUser.getEmail());
	            if (existEmail != null){
	                return 3;
	            }
	        }
	        return fontUserDao.insertFontUser(fontUser);
	}   */
}
