const CategoryController=require("../../../Controllers/category.controller");
const Model=require("../../../models");
const CategoryModel=Model.category;
const newCategory=require('../../mock-data/new-category.json')
const{mockRequest,mockResponse}=require('../controllers/interceptor');

let req,res;

beforeEach(()=>{
    req=mockRequest();
    res=mockResponse();
})



describe('CategoryController.create',()=>{

    beforeEach(()=>{
        req.body=newCategory;
    })

    test('should call CategoryController.create and create a new category',async ()=>{

        //Mocking model command
     const spy=   jest.spyOn(CategoryModel,'create')
        .mockImplementation((newCategory)=>Promise.resolve(newCategory));

        //executing controller command
        await CategoryController.create(req,res);

        //test to verify the create function

        expect(spy).toHaveBeenCalled();
        expect(CategoryModel.create).toHaveBeenCalledWith(newCategory);
        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.send).toHaveBeenCalledWith(newCategory);
    });


    // test('should call CategoryController.create and ends with an error',async ()=>{

    //     //Mocking Model command
    //     const spy=jest.spyOn(CategoryModel,'create')
    //     .mockImplementation((newCategory)=>Promise.reject("this is an error"));

    //     //executing controller command
    //     await CategoryController.create(req,res);

    //     //test to veify the create function

    //     expect(spy).toHaveBeenCalled();
    //     expect(CategoryModel.create).toHaveBeenCalledWith(newCategory);
    //     expect(res.status).toHaveBeenCalledWith(500);

        


    // });




});


describe('CategoryController.findAll',()=>{

    test('should call CategoryController.findAll with a query value', async ()=>{

        const queryParm={
            where:{
                name:"Electronics"
            }
        };

        const spy=jest.spyOn(CategoryModel,'findAll')
        .mockImplementation((queryParm)=>Promise.resolve(newCategory));

        req.query={
            name:"Electronics"
        }

        await CategoryController.findAll(req,res);

        expect(spy).toHaveBeenCalled();
        expect(CategoryModel.findAll).toHaveBeenCalledWith(queryParm);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.send).toHaveBeenCalledWith(newCategory);
    });


});