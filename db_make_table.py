#make table
# 하나씩 해야한다
import pymysql.cursors

conn = pymysql.connect(host='localhost',
                             user='root',
                             password='root',
                             db = 'examboard',
                             charset='utf8mb4')
try:
    with conn.cursor() as cursor:
        sql = '''
            CREATE TABLE comment_toefl (
            title varchar(30) NOT NULL,
            content varchar(1000) NOT NULL,
            nickName varchar(20) NOT NULL,
            date datetime default now(),
            FOREIGN KEY(title) REFERENCES toefl(title)
            on delete cascade
            on update cascade
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8
        '''
        cursor.execute(sql)
    conn.commit()
finally:
    conn.close()

#             CREATE TABLE userinfo (
#             nickName varchar(10) NOT NULL PRIMARY KEY,
#             userId varchar(20) NOT NULL,
#             userPassword varchar(20) NOT NULL,
#             phoneNumber varchar(13) NOT NULL
#         ) ENGINE=InnoDB DEFAULT CHARSET=utf8


#             CREATE TABLE userimage (
#             nickName varchar(10) NOT NULL,
#             originsrc varchar(200),
#             imgsrc varchar(200),
#             FOREIGN KEY(nickName) REFERENCES userinfo(nickName)
#         ) ENGINE=InnoDB DEFAULT CHARSET=utf8


#             CREATE TABLE teps (
#             title varchar(30) NOT NULL PRIMARY KEY,
#             content varchar(1000) NOT NULL,
#             nickName varchar(20) NOT NULL,
#             date datetime DEFAULT NOW()
#         ) ENGINE=InnoDB DEFAULT CHARSET=utf8


#             CREATE TABLE toeic (
#             title varchar(30) NOT NULL PRIMARY KEY,
#             content varchar(1000) NOT NULL,
#             nickName varchar(20) NOT NULL,
#             date datetime DEFAULT NOW()
#         ) ENGINE=InnoDB DEFAULT CHARSET=utf8


#             CREATE TABLE toefl (
#             title varchar(30) NOT NULL PRIMARY KEY,
#             content varchar(1000) NOT NULL,
#             nickName varchar(20) NOT NULL,
#             date datetime DEFAULT NOW()
#         ) ENGINE=InnoDB DEFAULT CHARSET=utf8


#             CREATE TABLE score (
#             nickName varchar(10) NOT NULL,
#             toeic int,
#             toefl int,
#             teps int,
#             date datetime DEFAULT NOW(),
#             FOREIGN KEY(nickName) REFERENCES userinfo(nickName)
#         ) ENGINE=InnoDB DEFAULT CHARSET=utf8

#             CREATE TABLE image_teps (
#             title varchar(30) NOT NULL,
#             originsrc varchar(200) NOT NULL,
#             imgsrc varchar(200) NOT NULL,
#             FOREIGN KEY(title) REFERENCES teps(title)
#         ) ENGINE=InnoDB DEFAULT CHARSET=utf8

#         CREATE TABLE image_toeic (
#             title varchar(30) NOT NULL,
#             originsrc varchar(200) NOT NULL,
#             imgsrc varchar(200) NOT NULL,
#             FOREIGN KEY(title) REFERENCES toeic(title)
#         ) ENGINE=InnoDB DEFAULT CHARSET=utf8

#         CREATE TABLE image_toefl (
#             title varchar(30) NOT NULL,
#             originsrc varchar(200) NOT NULL,
#             imgsrc varchar(200) NOT NULL,
#             FOREIGN KEY(title) REFERENCES toefl(title)
#         ) ENGINE=InnoDB DEFAULT CHARSET=utf8

#         CREATE TABLE comment_teps (
#             title varchar(30) NOT NULL,
#             content varchar(1000) NOT NULL,
#             nickName varchar(20) NOT NULL,
#             date datetime default now(),
#             FOREIGN KEY(title) REFERENCES teps(title)
#             on delete cascade 
#             on update cascade
#         ) ENGINE=InnoDB DEFAULT CHARSET=utf8

#         CREATE TABLE comment_toeic (
#             title varchar(30) NOT NULL,
#             content varchar(1000) NOT NULL,
#             nickName varchar(20) NOT NULL,
#             date datetime default now(),
#             FOREIGN KEY(title) REFERENCES toeic(title)
#             on delete cascade
#             on update cascade
#         ) ENGINE=InnoDB DEFAULT CHARSET=utf8

#         CREATE TABLE comment_toefl (
#             title varchar(30) NOT NULL,
#             content varchar(1000) NOT NULL,
#             nickName varchar(20) NOT NULL,
#             date datetime default now(),
#             FOREIGN KEY(title) REFERENCES toefl(title)
#             on delete cascade
#             on update cascade
#         ) ENGINE=InnoDB DEFAULT CHARSET=utf8
#         '''