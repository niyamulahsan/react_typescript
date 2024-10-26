const route = require("express").Router();
const infoValidation = require("./info.validation");
const infoController = require("./info.controller");
const authentication = require("../../middleware/authentication");
const { validation } = require("../../middleware/errorhandler");
const role = require("../../middleware/role");

/**
 * @swagger
 * tags: Infos
 * components:
 *  schemas:
 *    Info:
 *      type: object
 *      properties:
 *        id:
 *          type: integer
 *          description: primary key int unsigned
 *        name:
 *          type: string
 *          description: write name
 *        email:
 *          type: string
 *          description: write email
 *        mobile:
 *          type: string
 *          description: write mobile
 *        createdAt:
 *          type: string
 *          description: auto generated date time
 *        updatedAt:
 *          type: string
 *          description: auto generated date time
 */

/**
 * @swagger
 * paths:
 *  /api/info:
 *    get:
 *      operationId: all_info
 *      summary: get all info
 *      tags: [Infos]
 *      parameters:
 *        - in: query
 *          name: page
 *          schema:
 *            type: number
 *        - in: query
 *          name: size
 *          schema:
 *            type: number
 *        - in: query
 *          name: search
 *          schema:
 *            type: string
 *      responses:
 *        200:
 *          description: The list of Info
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Info'
 */
route.get("/info", authentication, infoController.index);

/**
 * @swagger
 * paths:
 *  /api/info:
 *    post:
 *      operationId: add_info
 *      summary: create info
 *      tags: [Infos]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                name:
 *                  type: string
 *                  example: "Jhon Doe"
 *                  required: true
 *                email:
 *                  type: string
 *                  example: "jhondoe@mail.com"
 *                  required: true
 *                mobile:
 *                  type: string
 *                  example: "+8801711000000"
 *                  required: true
 *      responses:
 *        200:
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Info'
 */
route.post("/info", authentication, infoValidation.storeschema, validation, infoController.store);

/**
 * @swagger
 * paths:
 *   /api/info/{id}:
 *     get:
 *       operationId: single_info
 *       summery: single info fetch
 *       tags: [Infos]
 *       parameters:
 *         - in: path
 *           name: id
 *           required: true
 *           schema:
 *             type: number
 *       responses:
 *         200:
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/Info'
 */
route.get("/info/:id", authentication, infoController.show);

/**
 * @swagger
 * paths:
 *  /api/info/{id}:
 *    put:
 *      operationId: update_info
 *      summary: update info
 *      tags: [Infos]
 *      parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          schema:
 *            type: string
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                name:
 *                  type: string
 *                  example: Jane Doe
 *                email:
 *                  type: string
 *                  example: "janedoe@mail.com"
 *                mobile:
 *                  type: string
 *                  example: "+8801911000000"
 *      responses:
 *        200:
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Info'
 */
route.put("/info/:id", authentication, infoValidation.updatechema, validation, infoController.update);

/**
 * @swagger
 * paths:
 *   /api/info/{id}:
 *     delete:
 *       operationId: single_info_delete
 *       summery: single info delete
 *       tags: [Infos]
 *       parameters:
 *         - in: path
 *           name: id
 *           required: true
 *           schema:
 *             type: array
 *             items:
 *               type: number
 *           description: Comma-separated list of type IDs to delete
 *       responses:
 *         200:
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/Info'
 */
route.delete("/info/:id", authentication, infoController.delete);

module.exports = route;
