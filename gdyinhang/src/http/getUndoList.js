import http from './index'



export function getUndoList() {
    const url = `api/list`
    return http.get(url)
        .then(({
            data
        }) => {
            return data
        })
        .catch(e => console.log(e))
}
export function userGetIssuesMock(userName) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve([　　{　　　　
                    "事件单号": "ICT-201804-112",
                    　　　　"转入时间": "2018-04-08T16:07:08",
                    　　　　"事件标题": "中山分行关于温州海宏贸易有限公司数据查询统计提取修改登记表[中山分行/公司金融部登记表（613号）20180408]",
                    　　　　"FLOWID": 53922　　
                }, 　　 {　　　　
                    "事件单号": "ICT-201804-99",
                    　　　　"转入时间": "2018-04-08T11:09:40",
                    　　　　"事件标题": "关于提取“春雷行动”个贷跨年营销活动数据的需求[个人信贷管理部登记表（609号）20180404]",
                    　　　　"FLOWID": 53904　　
                }, 　　 {　　　　
                    "事件单号": "ICT-201804-67",
                    　　　　"转入时间": "2018-04-04T11:42:20",
                    　　　　"事件标题": "关于修改唐俊辉提前还款取消的需求[广州分行/荔湾支行登记表（599号）20180404]",
                    　　　　"FLOWID": 53869　　
                }, 　　 {　　　　
                    "事件单号": "ICT-201803-598",
                    　　　　"转入时间": "2018-04-02T15:54:56",
                    　　　　"事件标题": "关于公务员E贷利息问题[广州分行/综合管理部登记表（577号）20180329]",
                    　　　　"FLOWID": 53732　　
                }, 　　 {　　　　
                    "事件单号": "ICT-201803-568",
                    　　　　"转入时间": "2018-03-29T14:38:49",
                    　　　　"事件标题": "关于黄宇惠工号所属机构的调整[授信审批部登记表（573号）20180328]",
                    　　　　"FLOWID": 53697　　
                }, 　　 {　　　　
                    "事件单号": "ICT-201803-463",
                    　　　　"转入时间": "2018-03-23T16:48:06",
                    　　　　"事件标题": "关于信贷系统审批权限配置问题[授信审批部登记表（539号）20180322]",
                    　　　　"FLOWID": 53538　　
                }, 　　 {　　　　
                    "事件单号": "ICT-201803-421",
                    　　　　"转入时间": "2018-03-27T08:52:03",
                    　　　　"事件标题": "6级-影像服务器磁盘空间使用率大于95%",
                    　　　　"FLOWID": 53479　　
                }, 　　 {　　　　
                    "事件单号": "ICT-201803-243",
                    　　　　"转入时间": "2018-03-15T14:41:54",
                    　　　　"事件标题": "关于协助查明下岗职工贷款余额为零但状态显示未结清的需求[零售风险控制部〔2018〕170号登记表20180313]",
                    　　　　"FLOWID": 53239　　
                }, 　　 {　　　　
                    "事件单号": "ICT-201803-171",
                    　　　　"转入时间": "2018-03-13T14:25:29",
                    　　　　"事件标题": "关于协助解决电子银行承兑汇票界面状态问题的需求[海珠支行〔2018〕451号登记表20180309]",
                    　　　　"FLOWID": 53124　　
                }, 　　 {　　　　
                    "事件单号": "ICT-201801-566",
                    　　　　"转入时间": "2018-01-24T16:34:26",
                    　　　　"事件标题": "关于朱世俊贷款业务已结清但没有产生结清报文的需求[零售风险控制部登记表（204号）20180123]",
                    　　　　"FLOWID": 52006　　
                }, 　　 {　　　　
                    "事件单号": "ICT-201801-527",
                    　　　　"转入时间": "2018-01-23T09:12:54",
                    　　　　"事件标题": "关于查找国际业务系统国际收支基础信息重复申报的原因并协助解决的需求[公司金融部/国际业务中心登记表（182号）20180122]",
                    　　　　"FLOWID": 51965　　
                }, 　　 {　　　　
                    "事件单号": "ICT-201801-315",
                    　　　　"转入时间": "2018-01-19T10:15:23",
                    　　　　"事件标题": "关于进口代付业务国际业务系统生产环境中的问题[公司金融部/国际业务中心登记表（103号）20180115]",
                    　　　　"FLOWID": 51636　　
                }, 　　 {　　　　
                    "事件单号": "ICT-201801-185",
                    　　　　"转入时间": "2018-01-24T15:14:54",
                    　　　　"事件标题": "6级-对公信贷系统应用频繁死掉。",
                    　　　　"FLOWID": 51465　　
                }, 　　 {　　　　
                    "事件单号": "ICT-201801-80",
                    　　　　"转入时间": "2018-01-16T15:13:35",
                    　　　　"事件标题": "关于个人征信平台征信问题数据修改的需求[零售风险控制部登记表（16号）20180104]",
                    　　　　"FLOWID": 51319　　
                }

            ])
        }, 500)
    })
}



export function FlowGetIssuesMock(flowId) {
    return new Promise(resolve => {
        setTimeout(() => resolve([
            　　{
            　　　　"事件单号":"ICT-201804-112",
            　　　　"转入时间":"2018-04-08T16:07:08",
            　　　　"登记时间":"2018-04-08T09:39:00",
            　　　　"创建人":"陈雅雯",
            　　　　"主题":"中山分行关于温州海宏贸易有限公司数据查询统计提取修改登记表[中山分行/公司金融部登记表（613号）20180408]",
            　　　　"详细描述":"详见附件",
            　　　　"事件状态":"处理中"
            　　}
              ]), 500);
    })
}


export function FlowGetMessageMock(flowId) {
    return new Promise(resolve => {
        setTimeout(() => resolve([
            　　{
            　　　　"转入时间":"2018-04-08T08:54:22",
            　　　　"处理人":null,
            　　　　"ACTORTYPE":0,
            　　　　"流转情况":"事件服务台",
            　　　　"意见":null
            　　},
            　　{
            　　　　"转入时间":"2018-04-08T09:57:07",
            　　　　"处理人":null,
            　　　　"ACTORTYPE":0,
            　　　　"流转情况":"王晓滨,倪征宇,李晔明",
            　　　　"意见":null
            　　},
            　　{
            　　　　"转入时间":"2018-04-08T14:16:00",
            　　　　"处理人":"王晓滨",
            　　　　"ACTORTYPE":0,
            　　　　"流转情况":"李运龙",
            　　　　"意见":"请李运龙处理"
            　　},
            　　{
            　　　　"转入时间":"2018-04-08T15:33:26",
            　　　　"处理人":"倪征宇",
            　　　　"ACTORTYPE":2,
            　　　　"流转情况":null,
            　　　　"意见":"已阅。"
            　　},
            　　{
            　　　　"转入时间":null,
            　　　　"处理人":"李晔明",
            　　　　"ACTORTYPE":2,
            　　　　"流转情况":null,
            　　　　"意见":null
            　　},
            　　{
            　　　　"转入时间":"2018-04-08T16:07:08",
            　　　　"处理人":"李运龙",
            　　　　"ACTORTYPE":0,
            　　　　"流转情况":"李运龙",
            　　　　"意见":"业务暂不处理。"
            　　},
            　　{
            　　　　"转入时间":null,
            　　　　"处理人":"李运龙",
            　　　　"ACTORTYPE":0,
            　　　　"流转情况":null,
            　　　　"意见":null
            　　}
              ]), 500);
    })
}




export function userGetIssues(userName) {
    return ajax(`<?xml version="1.0" encoding="utf-16"?>
    <soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema">
      <soap:Body>
        <UserGetIssues xmlns="http://tempuri.org/">
          <username>${userName}</username>
        </UserGetIssues>
      </soap:Body>
    </soap:Envelope>`, /<UserGetIssuesResult>([\s\S]*?)<\/UserGetIssuesResult>/)
}

export function FlowGetIssues(flowId) {
    return ajax(`<?xml version="1.0" encoding="utf-16"?>
    <soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema">
      <soap:Body>
        <FlowGetIssues xmlns="http://tempuri.org/">
          <strFlowID>${flowId}</strFlowID>
        </FlowGetIssues>
      </soap:Body>
    </soap:Envelope>`, /<FlowGetIssuesResult>([\s\S]*?)<\/FlowGetIssuesResult>/)
}

export function FlowGetMessage(flowId) {
    return ajax(`<?xml version="1.0" encoding="utf-16"?>
    <soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema">
      <soap:Body>
        <FlowGetMessage xmlns="http://tempuri.org/">
          <strFlowID>${flowId}</strFlowID>
        </FlowGetMessage>
      </soap:Body>
    </soap:Envelope>`, /<FlowGetMessageResult>([\s\S]*?)<\/FlowGetMessageResult>/)
}


function ajax(xml, matchReg) {
    var func = window.MXCommon && MXCommon.ajax ? mobileAjax : xmlAjax;
    return func(xml, matchReg)
}


function xmlAjax(xml, matchReg) {
    return new Promise((resolve, reject) => {
        var xhr = new XMLHttpRequest()
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4) {
                if (xhr.status == 200) {
                    var xmlObj = xhr.responseText;
                    var result = xmlObj.match(matchReg)[1];
                    resolve(JSON.parse(result));
                } else {
                    reject('请求失败，', xhr.status)
                    console.log(xhr.status)

                }
            }
        }

        xhr.open('post', 'http://218.19.164.168:8888/wxx/', true)
        xhr.setRequestHeader('Content-Type', 'text/xml; charset=utf-8')
        xhr.send(xml)
    })
}


function mobileAjax(xml, matchReg) {
    return new Promise((resolve, reject) => {
        MXCommon.ajax({
            type: "POST",
            url: 'http://218.19.164.168:8888/wxx/',
            dataType: "xml",
            data: xml,
            headers: {
                "Content-Type": 'text/xml; charset=utf-8'
            },
            async: true,
            complete: function(){},
            success: function (data,status,xhr) {
                var xmlObj = xhr.responseText;
                var result = xmlObj.match(matchReg)[1];
                resolve(JSON.parse(result));
            },
            error: function(data,status, xhr){
                reject('请求失败，', xhr.status)
                console.log('请求失败');
                console.log(JSON.stringify(data));
            }})
    })
}