import { Router } from "express";
import { adaptRoute } from "../adapters/koa-route-adapter";
import { makeSignUp } from "../factories/signup";

export default (router: Router) => {
  router.post('/signup', adaptRoute(makeSignUp()))
}