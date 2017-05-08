import expect from 'expect'
import Validator from '../src/validator'

describe.only('Validator', () => {
  describe('from node receiving options', () => {
    xit('should create instance', () => {
      const validator = new Validator()

      expect(validator).toExist()
      expect(validator.constructor).toBe(Validator)
    })

    describe('#_determineExtensions', () => {

      it('errors if only src is provided', () => {
        try {
          const validator = new Validator(undefined, 'src')
        } catch (e) {
          expect(e.message).toEqual('A source and destination are required')
        }
      })

      it('errors if only dest is provided', () => {
        try {
          const validator = new Validator(undefined, undefined, 'dest')
        } catch (e) {
          expect(e.message).toEqual('A source and destination are required')
        }
      })

      it('sets src and dest when both are supplied', () => {
        const validator = new Validator(undefined, 'jsx', 'js')
        expect(validator.src).toBe('jsx')
        expect(validator.dest).toBe('js')
      })

    })
  })
})


