package utils

import (
	"errors"
	"reflect"
	"server/src/types"
	"strconv"
)

func CalculateScore(onboardingResponse types.OnboardingResponse) (uint, error) {
	var sum = 0

	values := reflect.ValueOf(onboardingResponse)
	// types := values.Type()

	for i := 0; i < values.NumField(); i++ {
		value, err := strconv.Atoi(values.Field(i).String())
		if err != nil {
			return 0, err
		}

		sum += value
	}

	switch {
	case sum < 18:
		return 1, nil
	case sum < 36:
		return 2, nil
	case sum < 54:
		return 3, nil
	case sum < 72:
		return 4, nil
	case sum < 91:
		return 5, nil
	default:
		return 0, errors.New("Invalid input")
	}
}
