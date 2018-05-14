package com.amoxu.mapper.likes;

import com.amoxu.entity.likes.LikeBuzz;
import com.amoxu.entity.likes.LikeBuzzExample;
import com.amoxu.entity.likes.LikeBuzzKey;
import java.util.List;
import org.apache.ibatis.annotations.Param;

public interface LikeBuzzMapper {
    int countByExample(LikeBuzzExample example);

    int deleteByExample(LikeBuzzExample example);

    int deleteByPrimaryKey(LikeBuzzKey key);

    int insert(LikeBuzz record);

    int insertSelective(LikeBuzz record);

    List<LikeBuzz> selectByExample(LikeBuzzExample example);

    LikeBuzz selectByPrimaryKey(LikeBuzzKey key);

    int updateByExampleSelective(@Param("record") LikeBuzz record, @Param("example") LikeBuzzExample example);

    int updateByExample(@Param("record") LikeBuzz record, @Param("example") LikeBuzzExample example);

    int updateByPrimaryKeySelective(LikeBuzz record);

    int updateByPrimaryKey(LikeBuzz record);
}