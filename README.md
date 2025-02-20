# 屏幕常亮工具

一个简洁优雅的屏幕常亮工具，使用 Bing 每日壁纸作为背景。

## 功能特点

- 🌟 一键开启屏幕常亮
- 🖼️ 自动加载 Bing 每日壁纸
- 🎨 简约优雅的玻璃拟态设计
- 🔄 每24小时自动更新壁纸
- ⚡ 轻量级，无需安装

## 技术栈

- React 18
- Vite 4
- GitHub Actions 自动部署

## 本地开发

1. 克隆项目：
```bash
git clone https://github.com/your-username/lumino_front.git
cd lumino_front
```

2. 安装依赖：
```bash
npm install
```

3. 启动开发服务器：
```bash
npm run dev
```

## 项目结构

```
lumino_front/
├── src/
│   ├── components/
│   │   ├── DynamicBackground.jsx    # Bing 壁纸背景组件
│   │   └── ScreenKeepAwake.jsx      # 屏幕常亮组件
│   ├── styles/
│   │   └── background.css           # 背景样式
│   ├── App.jsx                      # 主应用组件
│   └── main.jsx                     # 入口文件
└── package.json                     # 项目配置文件
```

## 自动部署

项目使用 GitHub Actions 自动部署到 GitHub Pages。每次推送到 master 分支时会自动触发部署流程。

## 实现原理

- **屏幕常亮**: 通过定期更新页面标题来保持屏幕活跃
- **背景更新**: 使用 Bing 壁纸 API 获取每日高清壁纸
- **视觉效果**: 采用玻璃拟态设计，提供沉浸式体验

## 开发者

- 设计与开发：[your-username](https://github.com/your-username)

## 许可

MIT License