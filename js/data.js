/**
 * data.js - 力合·人才智库 V2 Mock 数据
 * 品牌色：#8e2294（主色）、#6b1a70（辅色）、#F8C24C（品牌金）
 */

const POSITION_LEVELS = ['集团领导', '部门正职', '部门副职', '高级主管', '主管', '专员'];
const DEPARTMENTS = ['集团总部', '人力资源部', '财务管理部', '投资发展部', '市场运营部', '技术研发部', '工程管理部', '生产运营部', '法务部', '审计部'];
const EDUCATIONS = ['博士研究生', '硕士研究生', '大学本科'];

// ==================== 干部记录（20条）====================
const cadres = [
  { id: 'C001', name: '张明远', gender: '男', birthDate: '1975-03-15', age: 49, nativePlace: '广东深圳', politicalStatus: '中共党员', education: '硕士研究生', degree: '工商管理硕士', entryDate: '1998-07-01', tenure: 26, currentPosition: '党委书记、董事长', positionLevel: '集团领导', positionDate: '2020-01-15', department: '集团总部', status: '在任', email: 'zhangmy@leaguer.com', phone: '13800138001', warning: false },
  { id: 'C002', name: '李淑华', gender: '女', birthDate: '1980-08-22', age: 44, nativePlace: '广东广州', politicalStatus: '中共党员', education: '博士研究生', degree: '经济学博士', entryDate: '2005-09-01', tenure: 19, currentPosition: '党委副书记、总经理', positionLevel: '集团领导', positionDate: '2021-03-20', department: '集团总部', status: '在任', email: 'lish@leaguer.com', phone: '13800138002', warning: false },
  { id: 'C003', name: '王建国', gender: '男', birthDate: '1968-11-05', age: 56, nativePlace: '湖南长沙', politicalStatus: '中共党员', education: '大学本科', degree: '工学学士', entryDate: '1990-08-15', tenure: 34, currentPosition: '副总经理', positionLevel: '集团领导', positionDate: '2015-06-10', department: '运营管理中心', status: '在任', email: 'wangjg@leaguer.com', phone: '13800138003', warning: true },
  { id: 'C004', name: '陈晓东', gender: '男', birthDate: '1982-04-18', age: 42, nativePlace: '广东佛山', politicalStatus: '中共党员', education: '硕士研究生', degree: '金融学硕士', entryDate: '2008-07-01', tenure: 16, currentPosition: '财务总监', positionLevel: '部门正职', positionDate: '2019-09-01', department: '财务管理部', status: '在任', email: 'chenxd@leaguer.com', phone: '13800138004', warning: false },
  { id: 'C005', name: '刘雅琴', gender: '女', birthDate: '1979-12-03', age: 44, nativePlace: '广东东莞', politicalStatus: '中共党员', education: '硕士研究生', degree: '法学硕士', entryDate: '2003-07-01', tenure: 21, currentPosition: '人力资源总监', positionLevel: '部门正职', positionDate: '2018-04-15', department: '人力资源部', status: '在任', email: 'liuyq@leaguer.com', phone: '13800138005', warning: false },
  { id: 'C006', name: '赵伟强', gender: '男', birthDate: '1985-06-28', age: 39, nativePlace: '广东中山', politicalStatus: '中共党员', education: '大学本科', degree: '管理学学士', entryDate: '2010-07-01', tenure: 14, currentPosition: '投资发展部经理', positionLevel: '部门正职', positionDate: '2022-01-10', department: '投资发展部', status: '在任', email: 'zhaowq@leaguer.com', phone: '13800138006', warning: false },
  { id: 'C007', name: '孙丽华', gender: '女', birthDate: '1983-09-14', age: 40, nativePlace: '广东珠海', politicalStatus: '中共党员', education: '硕士研究生', degree: '会计学硕士', entryDate: '2009-07-01', tenure: 15, currentPosition: '审计部经理', positionLevel: '部门正职', positionDate: '2020-07-01', department: '审计部', status: '在任', email: 'sunlh@leaguer.com', phone: '13800138007', warning: false },
  { id: 'C008', name: '周志刚', gender: '男', birthDate: '1972-01-20', age: 52, nativePlace: '湖北武汉', politicalStatus: '中共党员', education: '大学本科', degree: '土木工程学士', entryDate: '1995-07-01', tenure: 29, currentPosition: '工程管理部经理', positionLevel: '部门正职', positionDate: '2016-03-01', department: '工程管理部', status: '在任', email: 'zhouzg@leaguer.com', phone: '13800138008', warning: false },
  { id: 'C009', name: '吴美玲', gender: '女', birthDate: '1987-03-08', age: 37, nativePlace: '广东惠州', politicalStatus: '中共党员', education: '硕士研究生', degree: '市场营销硕士', entryDate: '2012-07-01', tenure: 12, currentPosition: '市场运营部经理', positionLevel: '部门正职', positionDate: '2023-02-15', department: '市场运营部', status: '在任', email: 'wuml@leaguer.com', phone: '13800138009', warning: false },
  { id: 'C010', name: '郑海涛', gender: '男', birthDate: '1978-07-30', age: 46, nativePlace: '广东汕头', politicalStatus: '中共党员', education: '大学本科', degree: '计算机科学学士', entryDate: '2001-07-01', tenure: 23, currentPosition: '信息技术部经理', positionLevel: '部门正职', positionDate: '2017-08-01', department: '技术研发部', status: '在任', email: 'zhenght@leaguer.com', phone: '13800138010', warning: false },
  { id: 'C011', name: '黄雪梅', gender: '女', birthDate: '1984-11-12', age: 39, nativePlace: '广东江门', politicalStatus: '中共党员', education: '硕士研究生', degree: '人力资源管理硕士', entryDate: '2011-07-01', tenure: 13, currentPosition: '人力资源部副经理', positionLevel: '部门副职', positionDate: '2022-07-01', department: '人力资源部', status: '在任', email: 'huangxm@leaguer.com', phone: '13800138011', warning: false },
  { id: 'C012', name: '林浩然', gender: '男', birthDate: '1990-05-05', age: 34, nativePlace: '广东肇庆', politicalStatus: '共青团员', education: '大学本科', degree: '金融学学士', entryDate: '2015-07-01', tenure: 9, currentPosition: '投资专员', positionLevel: '专员', positionDate: '2023-08-01', department: '投资发展部', status: '在任', email: 'linhr@leaguer.com', phone: '13800138012', warning: false },
  { id: 'C013', name: '何思颖', gender: '女', birthDate: '1986-02-17', age: 38, nativePlace: '广东茂名', politicalStatus: '中共党员', education: '硕士研究生', degree: '公共管理硕士', entryDate: '2013-07-01', tenure: 11, currentPosition: '行政管理部经理', positionLevel: '部门正职', positionDate: '2021-06-01', department: '集团总部', status: '在任', email: 'hesy@leaguer.com', phone: '13800138013', warning: false },
  { id: 'C014', name: '谢伟明', gender: '男', birthDate: '1976-09-25', age: 47, nativePlace: '广东湛江', politicalStatus: '中共党员', education: '大学本科', degree: '机械工程学士', entryDate: '1999-07-01', tenure: 25, currentPosition: '生产运营部经理', positionLevel: '部门正职', positionDate: '2014-05-01', department: '生产运营部', status: '在任', email: 'xiewm@leaguer.com', phone: '13800138014', warning: false },
  { id: 'C015', name: '梁晓峰', gender: '男', birthDate: '1988-10-10', age: 35, nativePlace: '广东清远', politicalStatus: '中共党员', education: '硕士研究生', degree: '电气工程硕士', entryDate: '2016-07-01', tenure: 8, currentPosition: '技术研发部经理', positionLevel: '部门正职', positionDate: '2023-01-01', department: '技术研发部', status: '在任', email: 'liangxf@leaguer.com', phone: '13800138015', warning: false },
  { id: 'C016', name: '罗嘉欣', gender: '女', birthDate: '1992-06-22', age: 32, nativePlace: '广东阳江', politicalStatus: '中共党员', education: '大学本科', degree: '法学学士', entryDate: '2017-07-01', tenure: 7, currentPosition: '法务专员', positionLevel: '专员', positionDate: '2024-01-15', department: '法务部', status: '试用期', email: 'luojx@leaguer.com', phone: '13800138016', warning: true },
  { id: 'C017', name: '郭志强', gender: '男', birthDate: '1974-04-03', age: 50, nativePlace: '广东梅州', politicalStatus: '中共党员', education: '硕士研究生', degree: '工商管理硕士', entryDate: '1997-07-01', tenure: 27, currentPosition: '战略规划部经理', positionLevel: '部门正职', positionDate: '2018-09-01', department: '集团总部', status: '在任', email: 'guozq@leaguer.com', phone: '13800138017', warning: true },
  { id: 'C018', name: '马晓燕', gender: '女', birthDate: '1981-07-14', age: 43, nativePlace: '广东韶关', politicalStatus: '民盟盟员', education: '博士研究生', degree: '材料科学博士', entryDate: '2009-07-01', tenure: 15, currentPosition: '研发总监', positionLevel: '部门正职', positionDate: '2022-04-01', department: '技术研发部', status: '在任', email: 'maxy@leaguer.com', phone: '13800138018', warning: false },
  { id: 'C019', name: '陈大伟', gender: '男', birthDate: '1969-12-28', age: 54, nativePlace: '广东河源', politicalStatus: '中共党员', education: '大学本科', degree: '化工学士', entryDate: '1992-07-01', tenure: 32, currentPosition: '安全环保部经理', positionLevel: '部门正职', positionDate: '2010-03-01', department: '生产运营部', status: '在任', email: 'chendw@leaguer.com', phone: '13800138019', warning: true },
  { id: 'C020', name: '杨思琪', gender: '女', birthDate: '1993-01-08', age: 31, nativePlace: '广东揭阳', politicalStatus: '中共党员', education: '硕士研究生', degree: '数据分析硕士', entryDate: '2019-07-01', tenure: 5, currentPosition: '数据分析师', positionLevel: '主管', positionDate: '2024-03-01', department: '技术研发部', status: '在任', email: 'yangsq@leaguer.com', phone: '13800138020', warning: false }
];

// ==================== 任免记录（10条）====================
const appointments = [
  { id: 'A001', cadreId: 'C006', cadreName: '赵伟强', type: '提拔', position: '投资发展部经理', department: '投资发展部', date: '2022-01-10', status: '已生效', approver: '党委会', documentNo: '力合党〔2022〕3号', levelChange: '平调转任正职', note: '经党委会研究决定，任命赵伟强为投资发展部经理。' },
  { id: 'A002', cadreId: 'C009', cadreName: '吴美玲', type: '提拔', position: '市场运营部经理', department: '市场运营部', date: '2023-02-15', status: '已生效', approver: '党委会', documentNo: '力合党〔2023〕5号', levelChange: '副职提拔正职', note: '因工作需要，提拔吴美玲任市场运营部经理。' },
  { id: 'A003', cadreId: 'C015', cadreName: '梁晓峰', type: '提拔', position: '技术研发部经理', department: '技术研发部', date: '2023-01-01', status: '已生效', approver: '党委会', documentNo: '力合党〔2023〕1号', levelChange: '主管提拔部门正职', note: '经公开竞聘，梁晓峰任技术研发部经理。' },
  { id: 'A004', cadreId: 'C012', cadreName: '林浩然', type: '平调', position: '投资专员', department: '投资发展部', date: '2024-01-15', status: '已生效', approver: '人力资源部', documentNo: '力合人〔2024〕2号', levelChange: '岗位调整', note: '试用期满转正，继续担任投资专员。' },
  { id: 'A005', cadreId: 'C016', cadreName: '罗嘉欣', type: '平调', position: '法务专员', department: '法务部', date: '2024-07-15', status: '待审批', approver: '人力资源部', documentNo: '力合人〔2024〕8号', levelChange: '试用期转正', note: '试用期将于2024年7月15日到期，需组织转正考核。' },
  { id: 'A006', cadreId: 'C003', cadreName: '王建国', type: '免职', position: '副总经理', department: '运营管理中心', date: '2024-12-01', status: '待审批', approver: '党委会', documentNo: '力合党〔2024〕12号', levelChange: '到龄退居二线', note: '因年龄原因，免去副总经理职务，改任调研员。' },
  { id: 'A007', cadreId: 'C019', cadreName: '陈大伟', type: '免职', position: '安全环保部经理', department: '生产运营部', date: '2025-03-01', status: '预警', approver: '人力资源部', documentNo: '力合人〔2025〕1号', levelChange: '到龄退休', note: '陈大伟将于2025年3月达到退休年龄，需提前启动交接。' },
  { id: 'A008', cadreId: 'C008', cadreName: '周志刚', type: '降职', position: '工程管理部副经理', department: '工程管理部', date: '2024-06-01', status: '已生效', approver: '党委会', documentNo: '力合党〔2024〕6号', levelChange: '正职降为副职', note: '因年度考核不称职，免去经理职务，降为副经理。' },
  { id: 'A009', cadreId: 'C020', cadreName: '杨思琪', type: '提拔', position: '数据分析师', department: '技术研发部', date: '2024-03-01', status: '已生效', approver: '人力资源部', documentNo: '力合人〔2024〕3号', levelChange: '专员提拔主管', note: '因工作表现突出，提拔为主管。' },
  { id: 'A010', cadreId: 'C011', cadreName: '黄雪梅', type: '提拔', position: '人力资源部副经理', department: '人力资源部', date: '2022-07-01', status: '已生效', approver: '党委会', documentNo: '力合党〔2022〕8号', levelChange: '主管提拔副职', note: '经竞聘上岗，任人力资源部副经理。' }
];

// ==================== 董监高记录（5条）====================
const directors = [
  { id: 'D001', cadreId: 'C001', name: '张明远', position: '董事长', type: '董事', termStart: '2020-01-15', termEnd: '2026-01-14', status: '在任', board: '董事会' },
  { id: 'D002', cadreId: 'C002', name: '李淑华', position: '董事', type: '董事', termStart: '2021-03-20', termEnd: '2027-03-19', status: '在任', board: '董事会' },
  { id: 'D003', cadreId: 'C004', name: '陈晓东', position: '监事会主席', type: '监事', termStart: '2019-09-01', termEnd: '2025-08-31', status: '在任', board: '监事会' },
  { id: 'D004', cadreId: 'C007', name: '孙丽华', position: '监事', type: '监事', termStart: '2020-07-01', termEnd: '2026-06-30', status: '在任', board: '监事会' },
  { id: 'D005', cadreId: 'C017', name: '郭志强', position: '职工董事', type: '董事', termStart: '2018-09-01', termEnd: '2024-08-31', status: '任期届满', board: '董事会' }
];

// ==================== 盘点数据（15条）====================
const reviews = [
  { cadreId: 'C001', performanceScore: 95, abilityScore: 92, potentialScore: 88, nineBoxX: 4.5, nineBoxY: 4.2 },
  { cadreId: 'C002', performanceScore: 93, abilityScore: 90, potentialScore: 85, nineBoxX: 4.3, nineBoxY: 4.0 },
  { cadreId: 'C003', performanceScore: 78, abilityScore: 75, potentialScore: 60, nineBoxX: 3.2, nineBoxY: 2.8 },
  { cadreId: 'C004', performanceScore: 88, abilityScore: 85, potentialScore: 80, nineBoxX: 3.8, nineBoxY: 3.5 },
  { cadreId: 'C005', performanceScore: 90, abilityScore: 88, potentialScore: 82, nineBoxX: 4.0, nineBoxY: 3.7 },
  { cadreId: 'C006', performanceScore: 82, abilityScore: 80, potentialScore: 88, nineBoxX: 3.5, nineBoxY: 4.0 },
  { cadreId: 'C007', performanceScore: 85, abilityScore: 82, potentialScore: 75, nineBoxX: 3.6, nineBoxY: 3.2 },
  { cadreId: 'C008', performanceScore: 75, abilityScore: 70, potentialScore: 55, nineBoxX: 2.8, nineBoxY: 2.5 },
  { cadreId: 'C009', performanceScore: 92, abilityScore: 90, potentialScore: 95, nineBoxX: 4.2, nineBoxY: 4.5 },
  { cadreId: 'C010', performanceScore: 80, abilityScore: 78, potentialScore: 72, nineBoxX: 3.3, nineBoxY: 3.0 },
  { cadreId: 'C011', performanceScore: 85, abilityScore: 88, potentialScore: 90, nineBoxX: 3.7, nineBoxY: 4.2 },
  { cadreId: 'C012', performanceScore: 70, abilityScore: 72, potentialScore: 85, nineBoxX: 2.5, nineBoxY: 3.8 },
  { cadreId: 'C013', performanceScore: 88, abilityScore: 85, potentialScore: 78, nineBoxX: 3.8, nineBoxY: 3.3 },
  { cadreId: 'C014', performanceScore: 72, abilityScore: 70, potentialScore: 65, nineBoxX: 2.8, nineBoxY: 2.7 },
  { cadreId: 'C015', performanceScore: 90, abilityScore: 92, potentialScore: 94, nineBoxX: 4.0, nineBoxY: 4.4 }
];

// ==================== 预警信息（5条）====================
const alerts = [
  { id: 'AL001', type: '到龄退休', cadreId: 'C019', cadreName: '陈大伟', position: '安全环保部经理', date: '2025-03-01', daysRemaining: 180, priority: '高', description: '陈大伟将于2025年3月达到退休年龄（60岁），需提前启动接班人选拔程序。' },
  { id: 'AL002', type: '任期届满', cadreId: 'D005', cadreName: '郭志强', position: '职工董事', date: '2024-08-31', daysRemaining: 15, priority: '高', description: '郭志强职工董事任期将于2024年8月31日届满，需启动换届选举程序。' },
  { id: 'AL003', type: '试用期到期', cadreId: 'C016', cadreName: '罗嘉欣', position: '法务专员', date: '2024-07-15', daysRemaining: 30, priority: '中', description: '罗嘉欣试用期将于2024年7月15日到期，需组织试用期考核评估。' },
  { id: 'AL004', type: '到龄退居二线', cadreId: 'C003', cadreName: '王建国', position: '副总经理', date: '2024-12-01', daysRemaining: 90, priority: '中', description: '王建国因年龄原因将于2024年12月退居二线，需做好工作交接。' },
  { id: 'AL005', type: '任期将满', cadreId: 'D003', cadreName: '陈晓东', position: '监事会主席', date: '2025-08-31', daysRemaining: 360, priority: '低', description: '陈晓东监事会主席任期将于2025年8月31日届满，建议提前6个月启动换届准备。' }
];

// ==================== 导出全局数据对象 ====================
const MOCK_DATA = { cadres, appointments, directors, reviews, alerts };

// 挂载到 window，供普通 <script> 跨文件引用（替代 ES Module 的 export）
if (typeof window !== 'undefined') {
  window.MOCK_DATA = MOCK_DATA;
  window.cadres = cadres;
  window.appointments = appointments;
  window.directors = directors;
  window.reviews = reviews;
  window.alerts = alerts;
  window.POSITION_LEVELS = POSITION_LEVELS;
  window.DEPARTMENTS = DEPARTMENTS;
  window.EDUCATIONS = EDUCATIONS;
}
