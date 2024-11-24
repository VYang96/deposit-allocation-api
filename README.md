# Deposit Plan Management System

## Project Overview

**Project Name**: Deposit Plan Management System

**Description**: This is a deposit plan management system built on the Node.js and Express framework. Users can create deposit plans, add deposit records, and allocate funds to different investment portfolios based on the deposit records. The system aims to provide users with a simple and easy-to-use interface for managing and allocating their investment funds.

## Features

1. **Create Deposit Plans**: Users can define deposit plans, including the type of plan (one-time or monthly) and fund allocation.
2. **Add Deposit Records**: Users can add deposit records for specific users, including the deposit amount and type.
3. **View Deposit Plans**: Users can view all created deposit plans.
4. **View Deposit Records**: Users can view all deposit records.
5. **Fund Allocation**: The system automatically allocates funds based on deposit records and deposit plans, ensuring that all funds are reasonably allocated.

## Tech Stack

- **Node.js**: Used as the server-side runtime environment.
- **Express**: Used to build RESTful APIs.
- **CORS**: Allows cross-origin requests.
- **body-parser**: Used to parse JSON data in request bodies.

## Installation and Running

1. **Clone the Project**:
   ```bash
   git clone https://github.com/username/repository.git

2. **Navigate to the Project Directory**:
   ```bash
   cd repository

3. **Install Dependencies**:
   ```bash
   npm install

4. **Start the Server**:
   ```bash
   npm start
   
# API Endpoint Documentation

## Create Deposit Plan

- **Request**: `POST /api/deposit-plans`
- **Description**: Create a new deposit plan.
- **Request Body**:
    ```json
   {
      "type": "one-time", // or "monthly"
      "allocations": [
          {
              "portfolio": {
                  "id": 1,
                  "name": "High risk",
                  "type": "equity",
                  "description": "High risk portfolio",
                  "riskLevel": "high"
              },
              "amount": 1000 //  The amount allocated to the portfolio
          },
          {
              "portfolio": {
                  "id": 2,
                  "name": "Retirement",
                  "type": "bonds",
                  "description": "Retirement portfolio",
                  "riskLevel": "low"
              },
              "amount": 500
          }
      ]
  }
    ```
- **Response**:
    - **Success**: Returns the created deposit plan information.
    - **Error**: Returns error information.

---

## Create Deposit Record

- **Request**: `POST /api/deposits`
- **Description**: Create a new deposit record.
- **Request Body**:
    ```json
    {
        "depositsList": [
            {
                "amount": 1000,
                "type": "one-time"
            }
        ],
        "user": "John Doe"
    }
    ```
- **Response**:
    - **Success**: Returns the created deposit record information.
    - **Error**: Returns error information.

---

## View All Deposit Plans

- **Request**: `GET /api/deposit-plans`
- **Description**: Retrieve all deposit plans.
- **Response**:
    - **Success**: Returns an array of deposit plans.
    - **Error**: Returns error information.

---

## View All Deposit Records

- **Request**: `GET /api/deposits`
- **Description**: Retrieve all deposit records.
- **Response**:
    - **Success**: Returns an array of deposit records.
    - **Error**: Returns error information.

---

## Allocate Funds

- **Request**: `POST /api/allocate-funds`
- **Description**: Allocate funds based on deposit records and deposit plans.
- **Response**:
    - **Success**: Returns the result of the fund allocation.
    - **Error**: Returns error information.
# 存款计划管理系统

## 项目概述

**项目名称**: 存款计划管理系统

**描述**: 这是一个基于 Node.js 和 Express 框架构建的存款计划管理系统。用户可以创建存款计划、添加存款记录，并根据存款记录分配资金到不同的投资组合。该系统旨在为用户提供一个简单易用的界面，以管理和分配其投资资金。

## 功能

1. **创建存款计划**: 用户可以定义存款计划，包括计划类型（一次性或按月）和资金分配。
2. **添加存款记录**: 用户可以为特定用户添加存款记录，包括存款金额和类型。
3. **查看存款计划**: 用户可以查看所有已创建的存款计划。
4. **查看存款记录**: 用户可以查看所有存款记录。
5. **资金分配**: 系统根据存款记录和存款计划自动分配资金，确保所有资金得到合理分配。

## 技术栈

- **Node.js**: 作为服务器端运行环境。
- **Express**: 用于构建 RESTful API。
- **CORS**: 允许跨源请求。
- **body-parser**: 用于解析请求体中的 JSON 数据。

## 安装和运行

1. **克隆项目**:
   ```bash
   git clone https://github.com/username/repository.git
   

2. **进入项目目录**:
    ```bash
   cd repository  

3. **安装依赖**:
   ```bash
   npm install

4. **启动服务器**:
   ```bash
   npm start


# API 端点文档

## 创建存款计划

- **请求**: `POST /api/deposit-plans`
- **描述**: 创建一个新的存款计划。
- **请求体**:
    ```json
    {
      "type": "one-time", // 或 "monthly"
      "allocations": [
          {
              "portfolio": {
                  "id": 1,
                  "name": "High risk",
                  "type": "equity",
                  "description": "High risk portfolio",
                  "riskLevel": "high"
              },
              "amount": 1000 // 分配给该投资组合的金额
          },
          {
              "portfolio": {
                  "id": 2,
                  "name": "Retirement",
                  "type": "bonds",
                  "description": "Retirement portfolio",
                  "riskLevel": "low"
              },
              "amount": 500
          }
      ]
  }
    ```
- **响应**:
    - **成功**: 返回创建的存款计划信息。
    - **错误**: 返回错误信息。

---

## 创建存款记录

- **请求**: `POST /api/deposits`
- **描述**: 创建一个新的存款记录。
- **请求体**:
    ```json
    {
        "depositsList": [
            {
                "amount": 1000,
                "type": "one-time"
            }
        ],
        "user": "John Doe"
    }
    ```
- **响应**:
    - **成功**: 返回创建的存款记录信息。
    - **错误**: 返回错误信息。

---

## 查看所有存款计划

- **请求**: `GET /api/deposit-plans`
- **描述**: 获取所有存款计划。
- **响应**:
    - **成功**: 返回存款计划的数组。
    - **错误**: 返回错误信息。

---

## 查看所有存款记录

- **请求**: `GET /api/deposits`
- **描述**: 获取所有存款记录。
- **响应**:
    - **成功**: 返回存款记录的数组。
    - **错误**: 返回错误信息。

---

## 分配资金

- **请求**: `POST /api/allocate-funds`
- **描述**: 根据存款记录和存款计划分配资金。
- **响应**:
    - **成功**: 返回资金分配结果。
    - **错误**: 返回错误信息。
