import { Router } from "express";

export default (router: Router) => {
  router.post('/signup', (_, res) => {
    res.status(200).send({ ok: 'ok!' })
  })
}