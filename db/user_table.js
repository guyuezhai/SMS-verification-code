const db = require( './db' );
const util = require( 'util' );

const tableName = 'core.user';

//获取用户

exports.getByPhone = async function ( phone ) {
    
    let sql = `SELECT * FROM ${tableName} WHERE phone = $1`;

    try{

        let result = await db.runSql(sql, [phone]);
    
        if( result && result.rows[0] ){
        
            return result.rows[0];
        }

    } catch( e ){

        console.error('查询用户出错', e);

    }
        
    return null;

}

